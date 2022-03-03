import { BN } from '@heavy-duty/anchor';
import { AccountInfo } from '@solana/web3.js';
import {
  APPLICATION_ACCOUNT_NAME,
  BUDGET_ACCOUNT_NAME,
  COLLABORATOR_ACCOUNT_NAME,
  COLLECTION_ACCOUNT_NAME,
  COLLECTION_ATTRIBUTE_ACCOUNT_NAME,
  INSTRUCTION_ACCOUNT_ACCOUNT_NAME,
  INSTRUCTION_ACCOUNT_NAME,
  INSTRUCTION_ARGUMENT_ACCOUNT_NAME,
  INSTRUCTION_RELATION_ACCOUNT_NAME,
  USER_ACCOUNT_NAME,
  WORKSPACE_ACCOUNT_NAME,
} from './consts';

export interface CollectionAttributeDto {
  name: string;
  kind: number;
  modifier: number | null;
  size: number | null;
  max: number | null;
  maxLength: number | null;
}

export interface InstructionAccountDto {
  name: string;
  kind: number;
  modifier: number | null;
  collection: string | null;
  space: number | null;
  payer: string | null;
  close: string | null;
}

export interface InstructionArgumentDto {
  name: string;
  kind: number;
  modifier: number | null;
  size: number | null;
  max: number | null;
  maxLength: number | null;
}

export interface InstructionRelationDto {
  from: string;
  to: string;
}

export interface Budget {
  authority: string;
  workspace: string;
  bump: number;
}

export interface Collaborator {
  authority: string;
  workspace: string;
  user: string;
  bump: number;
  isAdmin: boolean;
  status: {
    id: number;
    name: string;
  };
}

export interface User {
  authority: string;
  bump: number;
}

export interface Workspace {
  authority: string;
}

export interface Application {
  authority: string;
  workspace: string;
}

export interface Collection {
  authority: string;
  workspace: string;
  application: string;
}

export interface CollectionAttribute {
  authority: string;
  workspace: string;
  application: string;
  collection: string;
  kind: {
    id: number;
    name: string;
    size: number;
  };
  modifier: {
    id: number;
    name: string;
    size: number;
  } | null;
  max: number | null;
  maxLength: number | null;
}

export interface Instruction {
  authority: string;
  workspace: string;
  application: string;
  body: string;
}

export interface InstructionArgument {
  authority: string;
  workspace: string;
  application: string;
  instruction: string;
  kind: {
    id: number;
    name: string;
    size: number;
  };
  modifier: {
    id: number;
    name: string;
    size: number;
  } | null;
  max: number | null;
  maxLength: number | null;
}

export interface InstructionAccount {
  authority: string;
  workspace: string;
  application: string;
  instruction: string;
  kind: {
    id: number;
    name: string;
    collection: string | null;
  };
  modifier: {
    id: number;
    name: string;
    space: number | null;
    payer: string | null;
    close: string | null;
  } | null;
}

export interface InstructionRelation {
  authority: string;
  workspace: string;
  application: string;
  instruction: string;
}

export interface Account<T> {
  id: string;
  data: T;
  metadata: AccountInfo<Buffer>;
  createdAt: BN;
  updatedAt: BN;
}

export interface Document<T> extends Account<T> {
  name: string;
}

export interface Relation<T> extends Account<T> {
  from: string;
  to: string;
}

export type AccountName =
  | typeof USER_ACCOUNT_NAME
  | typeof COLLABORATOR_ACCOUNT_NAME
  | typeof BUDGET_ACCOUNT_NAME
  | typeof WORKSPACE_ACCOUNT_NAME
  | typeof APPLICATION_ACCOUNT_NAME
  | typeof COLLECTION_ACCOUNT_NAME
  | typeof COLLECTION_ATTRIBUTE_ACCOUNT_NAME
  | typeof INSTRUCTION_ACCOUNT_NAME
  | typeof INSTRUCTION_ARGUMENT_ACCOUNT_NAME
  | typeof INSTRUCTION_ACCOUNT_ACCOUNT_NAME
  | typeof INSTRUCTION_RELATION_ACCOUNT_NAME;