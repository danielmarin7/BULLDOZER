import * as Case from 'case';
import * as Handlebars from 'handlebars';
import {
	Instruction,
	InstructionAccount,
	InstructionArgument,
	InstructionRelation,
} from '../state';
import { instructionTemplate } from './templates';
import { formatName, registerHandleBarsHelpers } from './utils';

const getArgumentKindName = (id: number, name: string, size: number) => {
	if (id === 0) {
		return 'bool';
	} else if (id === 1) {
		if (size <= 256) {
			return 'u8';
		} else if (size > 256 && size <= 65536) {
			return 'u16';
		} else if (size > 65536 && size <= 4294967296) {
			return 'u32';
		} else {
			throw Error('Invalid max');
		}
	} else if (id === 2 || id === 3) {
		return Case.capital(name);
	} else {
		throw Error('Invalid kind');
	}
};

export class InstructionCodeGenerator {
	static generate(
		instruction: Instruction,
		instructionArguments: InstructionArgument[],
		instructionAccounts: InstructionAccount[],
		instructionRelations: InstructionRelation[]
	) {
		registerHandleBarsHelpers();

		const template = Handlebars.compile(instructionTemplate);
		return template({
			instruction: {
				name: formatName(instruction.name),
				body: instruction.body.split('\n'),
			},
			instructionArguments: instructionArguments.map((instructionArgument) => ({
				name: formatName(instructionArgument.name),
				kind: {
					...instructionArgument.kind,
					name: getArgumentKindName(
						instructionArgument.kind.id,
						instructionArgument.kind.name,
						instructionArgument.kind.size
					),
				},
				modifier: instructionArgument.modifier,
			})),
			instructionAccounts: instructionAccounts.map((instructionAccount) => ({
				name: formatName(instructionAccount.name),
				kind: instructionAccount.kind,
				modifier: instructionAccount.modifier,
				collection: instructionAccount.collection
					? formatName(instructionAccount.collection.name)
					: null,
				payer:
					instructionAccount.payer !== null
						? formatName(instructionAccount.payer.name)
						: null,
				close: instructionAccount.close
					? formatName(instructionAccount.close.name)
					: null,
				space: instructionAccount.space,
				relations: instructionRelations
					.filter((instructionRelation) =>
						instructionRelation.from.publicKey.equals(
							instructionAccount.publicKey
						)
					)
					.map((instructionRelation) =>
						formatName(instructionRelation.to.name)
					),
			})),
			collections: instructionAccounts
				.filter((instructionAccount) => instructionAccount.collection !== null)
				.map((instructionAccount) =>
					formatName(instructionAccount.collection.name)
				),
			initializesAccount: instructionAccounts.some(
				(instructionAccount) => instructionAccount.modifier?.id === 0
			),
		});
	}
}