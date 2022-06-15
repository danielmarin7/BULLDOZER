use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
  #[msg("Invalid attribute kind")]
  InvalidAttributeKind,
  #[msg("Invalid attribute modifier")]
  InvalidAttributeModifier,
  #[msg("You don't have permission to update this collection.")]
  UnauthorizedCollectionUpdate,
  #[msg("You don't have permission to set the authority of this collection.")]
  UnauthorizedCollectionSetAuthority,
  #[msg("You don't have permission to delete this collection.")]
  UnauthorizedCollectionDelete,
  #[msg("You don't have permission to set the authority of this collection's attribute.")]
  UnauthorizedCollectionAttributeSetAuthority,
  #[msg("You don't have permission to update this collection's attribute.")]
  UnauthorizedCollectionAttributeUpdate,
  #[msg("You don't have permission to delete this collection's attribute.")]
  UnauthorizedCollectionAttributeDelete,
}