export interface ApplicationInfo {
  authority: string;
  name: string;
}

export interface Application {
  id: string;
  data: ApplicationInfo;
}

export interface CollectionInfo {
  authority: string;
  application: string;
  name: string;
}

export interface Collection {
  id: string;
  data: CollectionInfo;
}

export interface CollectionExtension {
  attributes: CollectionAttribute[];
}

export type CollectionExtended = Collection & {
  attributes: CollectionAttribute[];
};

export interface CollectionAttributeInfo {
  authority: string;
  application: string;
  collection: string;
  name: string;
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

export interface CollectionAttribute {
  id: string;
  data: CollectionAttributeInfo;
}

export interface CollectionAttributeDto {
  name: string;
  kind: number;
  modifier: number | null;
  size: number | null;
  max: number | null;
  maxLength: number | null;
}

export interface InstructionInfo {
  authority: string;
  application: string;
  name: string;
  body: string;
}

export interface Instruction {
  id: string;
  data: InstructionInfo;
}

export interface InstructionArgumentInfo {
  authority: string;
  application: string;
  instruction: string;
  name: string;
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

export interface InstructionArgument {
  id: string;
  data: InstructionArgumentInfo;
}

export interface InstructionArgumentDto {
  name: string;
  kind: number;
  modifier: number | null;
  size: number | null;
  max: number | null;
  maxLength: number | null;
}

export interface Program {
  id: string;
  name: string;
}

export interface InstructionAccountInfo {
  authority: string;
  application: string;
  instruction: string;
  name: string;
  kind: {
    id: number;
    name: string;
  };
  modifier: {
    id: number;
    name: string;
  } | null;
  collection: string | null;
  space: number | null;
  payer: string | null;
  close: string | null;
}

export interface InstructionAccount {
  id: string;
  data: InstructionAccountInfo;
}

export interface InstructionAccountDto {
  name: string;
  kind: number;
  modifier: number | null;
  space: number | null;
}

export interface InstructionAccountExtras {
  collection: string | null;
  payer: string | null;
  close: string | null;
}

export interface InstructionAccountExtended {
  id: string;
  data: Omit<InstructionAccountInfo, 'collection' | 'payer' | 'close'> & {
    collection: Collection | null;
    payer: InstructionAccount | null;
    close: InstructionAccount | null;
    relations: InstructionRelationExtended[];
  };
}

export type InstructionExtended = Instruction & {
  arguments: InstructionArgument[];
  accounts: InstructionAccountExtended[];
};

export interface InstructionRelationInfo {
  authority: string;
  application: string;
  instruction: string;
  from: string;
  to: string;
}

export interface InstructionRelation {
  id: string;
  data: InstructionRelationInfo;
}

export interface InstructionRelationExtended {
  id: string;
  data: Omit<InstructionRelationInfo, 'from' | 'to'> & {
    from: InstructionAccount;
    to: InstructionAccount;
  };
}
