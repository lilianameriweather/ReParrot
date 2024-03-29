
CREATE proc [dbo].[Services_Update_IsDeleted_ById]
			@ModifiedBy int
			,@Id int
as

/*---------------TEST-----------------------
	
	Declare @Id int = 2;

	Declare @ModifiedBy int = 1 

	Execute dbo.Services_SelectById @Id

	Execute Services_Update_IsDeleted_ById
			@ModifiedBy
			,@Id

	Execute dbo.Services_SelectById @Id

*/


BEGIN

	DECLARE @datNow datetime2(7) = getutcdate();

	UPDATE [dbo].[Services]
		SET	[isDeleted] = 1
			,[ModifiedBy] = @ModifiedBy
			,[DateModified] = @datNow
	 WHERE Id = @Id


END
GO
