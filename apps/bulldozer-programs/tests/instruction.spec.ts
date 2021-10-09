import { Provider, setProvider, utils, workspace } from '@project-serum/anchor';
import { Keypair, SystemProgram } from '@solana/web3.js';
import { assert } from 'chai';

describe('instruction', () => {
  setProvider(Provider.env());
  const program = workspace.Bulldozer;
  const instruction = Keypair.generate();
  const application = Keypair.generate();
  const applicationName = 'my-app';

  before(async () => {
    await program.rpc.createApplication(applicationName, {
      accounts: {
        authority: program.provider.wallet.publicKey,
        application: application.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [application],
    });
  });

  it('should create account', async () => {
    // arrange
    const instructionName = 'create_document';
    // act
    await program.rpc.createInstruction(instructionName, {
      accounts: {
        authority: program.provider.wallet.publicKey,
        application: application.publicKey,
        instruction: instruction.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [instruction],
    });
    // assert
    const account = await program.account.instruction.fetch(
      instruction.publicKey
    );
    assert.ok(account.authority.equals(program.provider.wallet.publicKey));
    assert.equal(utils.bytes.utf8.decode(account.name), instructionName);
    assert.ok(account.application.equals(application.publicKey));
  });

  it('should update account', async () => {
    // arrange
    const instructionName = 'update_document';
    // act
    await program.rpc.updateInstruction(instructionName, {
      accounts: {
        authority: program.provider.wallet.publicKey,
        instruction: instruction.publicKey,
      },
    });
    // assert
    const account = await program.account.instruction.fetch(
      instruction.publicKey
    );
    assert.equal(utils.bytes.utf8.decode(account.name), instructionName);
  });

  it('should delete account', async () => {
    // act
    await program.rpc.deleteInstruction({
      accounts: {
        authority: program.provider.wallet.publicKey,
        instruction: instruction.publicKey,
      },
    });
    // assert
    const account = await program.account.instruction.fetchNullable(
      instruction.publicKey
    );
    assert.equal(account, null);
  });
});
