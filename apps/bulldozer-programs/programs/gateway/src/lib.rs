use anchor_lang::prelude::*;

mod collections;
mod errors;
mod instructions;

use instructions::*;

declare_id!("DuHpQ4mnb4GDP5r6ed3iBTZf3ETSPP4wTe7yTn6Ls6ZH");

#[program]
pub mod gateway {
    use super::*;

    pub fn create_gateway(ctx: Context<CreateGateway>) -> Result<()> {
        instructions::create_gateway::handle(ctx)
    }

    pub fn create_workspace(
        ctx: Context<CreateWorkspace>,
        id: u32,
        name: String,
        initial_deposit: u64,
    ) -> Result<()> {
        instructions::create_workspace::handle(ctx, id, name, initial_deposit)
    }

    pub fn update_workspace(ctx: Context<UpdateWorkspace>, name: String) -> Result<()> {
        instructions::update_workspace::handle(ctx, name)
    }

    pub fn delete_workspace(ctx: Context<DeleteWorkspace>) -> Result<()> {
        instructions::delete_workspace::handle(ctx)
    }

    pub fn create_collaborator(ctx: Context<CreateCollaborator>) -> Result<()> {
        instructions::create_collaborator::handle(ctx)
    }

    pub fn withdraw_from_budget(ctx: Context<WithdrawFromBudget>, amount: u64) -> Result<()> {
        instructions::withdraw_from_budget::handle(ctx, amount)
    }

    pub fn create_application(
        ctx: Context<CreateApplication>,
        id: u32,
        name: String,
    ) -> Result<()> {
        instructions::create_application::handle(ctx, id, name)
    }

    pub fn update_application(ctx: Context<UpdateApplication>, name: String) -> Result<()> {
        instructions::update_application::handle(ctx, name)
    }

    pub fn delete_application(ctx: Context<DeleteApplication>) -> Result<()> {
        instructions::delete_application::handle(ctx)
    }

    pub fn create_collection(ctx: Context<CreateCollection>, id: u32, name: String) -> Result<()> {
        instructions::create_collection::handle(ctx, id, name)
    }

    pub fn update_collection(ctx: Context<UpdateCollection>, name: String) -> Result<()> {
        instructions::update_collection::handle(ctx, name)
    }

    pub fn delete_collection(ctx: Context<DeleteCollection>) -> Result<()> {
        instructions::delete_collection::handle(ctx)
    }
}
