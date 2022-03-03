use crate::collections::{Application, Collaborator, User};
use crate::enums::CollaboratorStatus;
use crate::errors::ErrorCode;
use anchor_lang::prelude::*;

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct UpdateApplicationArguments {
  name: String,
}

#[derive(Accounts)]
#[instruction(arguments: UpdateApplicationArguments)]
pub struct UpdateApplication<'info> {
  pub authority: Signer<'info>,
  #[account(mut)]
  pub application: Box<Account<'info, Application>>,
  #[account(
    seeds = [
      b"user".as_ref(),
      authority.key().as_ref(),
    ],
    bump = user.bump
  )]
  pub user: Box<Account<'info, User>>,
  #[account(
    seeds = [
      b"collaborator".as_ref(),
      application.workspace.as_ref(),
      user.key().as_ref(),
    ],
    bump = collaborator.bump,
    constraint = collaborator.status == CollaboratorStatus::Approved { id: 1 } @ ErrorCode::CollaboratorStatusNotApproved,
  )]
  pub collaborator: Box<Account<'info, Collaborator>>,
}

pub fn handle(
  ctx: Context<UpdateApplication>,
  arguments: UpdateApplicationArguments,
) -> Result<()> {
  msg!("Update application");
  ctx.accounts.application.rename(arguments.name);
  ctx.accounts.application.bump_timestamp()?;
  Ok(())
}