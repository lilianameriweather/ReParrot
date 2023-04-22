USE [ReParrot]
GO
/****** Object:  StoredProcedure [dbo].[Services_Update_IsDeleted_ById]    Script Date: 4/22/2023 10:29:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Liliana Meriweather
-- Create date: 12/17/2022
-- Description: Updates IsDeleted Column to true/false
-- Code Reviewer:

-- MODIFIED BY: author
-- MODIFIED DATE:12/18/2022
-- Code Reviewer:Bao Han Phung
-- Note:
-- =============================================


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
