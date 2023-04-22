USE [ReParrot]
GO
/****** Object:  StoredProcedure [dbo].[Services_Insert]    Script Date: 4/22/2023 10:29:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Liliana Meriweather
-- Create date: 12/17/2022
-- Description: Adds Service to Services table
-- Code Reviewer: Bao

-- MODIFIED BY: author
-- MODIFIED DATE:12/17/2022
-- Code Reviewer: Bao Han Phung
-- Note:
-- =============================================


CREATE proc [dbo].[Services_Insert]
				@Name nvarchar(100)
			   ,@SKU nvarchar(100)
			   ,@Description nvarchar(500)
			   ,@OrganizationId int
			   ,@ServiceTypeId int
			   ,@UnitTypeId int
			   ,@UnitCost decimal(18,0)
			   ,@EstimatedDuration int
			   ,@isDeleted bit
			   ,@CreatedBy int
			   ,@ModifiedBy int
			   ,@Id int OUTPUT

/*---------------------TEST----------------------
		Declare	@Id int = 0;

		Declare @Name nvarchar(100) = 'Insert Test' 
			   ,@SKU nvarchar(100) = 'SKU'
			   ,@Description nvarchar(500) = 'Description'
			   ,@OrganizationId int = 1
			   ,@ServiceTypeId int = 1
			   ,@UnitTypeId int = 1
			   ,@UnitCost decimal(18,0) = 10
			   ,@EstimatedDuration int = 45
			   ,@isDeleted bit = 0
			   ,@CreatedBy int = 1
			   ,@ModifiedBy int = 1
			   
		Execute dbo.Services_Insert
				@Name
			   ,@SKU
			   ,@Description
			   ,@OrganizationId
			   ,@ServiceTypeId
			   ,@UnitTypeId
			   ,@UnitCost
			   ,@EstimatedDuration
			   ,@isDeleted
			   ,@CreatedBy
			   ,@ModifiedBy
			   ,@Id OUTPUT
		
		Execute dbo.Services_SelectById @Id 

*/

as

BEGIN 

	INSERT INTO [dbo].[Services]
			   ([Name]
			   ,[SKU]
			   ,[Description]
			   ,[OrganizationId]
			   ,[ServiceTypeId]
			   ,[UnitTypeId]
			   ,[UnitCost]
			   ,[EstimatedDuration]
			   ,[isDeleted]
			   ,[CreatedBy]
			   ,[ModifiedBy])

		 VALUES
			   (@Name
			   ,@SKU
			   ,@Description
			   ,@OrganizationId
			   ,@ServiceTypeId
			   ,@UnitTypeId
			   ,@UnitCost
			   ,@EstimatedDuration
			   ,@isDeleted
			   ,@CreatedBy
			   ,@ModifiedBy)

	  SET @Id = SCOPE_IDENTITY()

END
GO
