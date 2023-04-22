USE [ReParrot]
GO
/****** Object:  StoredProcedure [dbo].[Services_Update]    Script Date: 4/22/2023 10:29:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Liliana Meriweather
-- Create date: 12/17/2022
-- Description: Updates Service from Services table
-- Code Reviewer:

-- MODIFIED BY: author
-- MODIFIED DATE:12/17/2022
-- Code Reviewer: Bao Han Phung
-- Note:
-- =============================================


CREATE proc [dbo].[Services_Update]
			@Name nvarchar(100)
			,@SKU nvarchar(100)
			,@Description nvarchar(500)
			,@OrganizationId int
			,@ServiceTypeId int
			,@UnitTypeId int
			,@UnitCost decimal(18,0)
			,@EstimatedDuration int
			,@isDeleted bit
			,@ModifiedBy int
			,@Id int

/*-----------------------TEST-------------------------

	Declare @Id int = 1;

	Declare	@Name nvarchar(100) = 'Oil Change'
			,@SKU nvarchar(100) = 'SKU'
			,@Description nvarchar(500) = 'Get Oil Changed.'
			,@OrganizationId int = 2
			,@ServiceTypeId int = 1
			,@UnitTypeId int = 6
			,@UnitCost decimal(18,0) = 50.99
			,@EstimatedDuration int = 30
			,@isDeleted bit = 0
			,@ModifiedBy int = 6

	Execute dbo.Services_SelectById @Id

	Execute [dbo].[Services_Update]
			@Name
			,@SKU
			,@Description
			,@OrganizationId
			,@ServiceTypeId
			,@UnitTypeId
			,@UnitCost
			,@EstimatedDuration
			,@isDeleted
			,@ModifiedBy
			,@Id

	Execute dbo.Services_SelectById @Id
		
*/

as


BEGIN

	DECLARE @datNow datetime2(7) = getutcdate();

	UPDATE [dbo].[Services]
	   SET [Name] = @Name
		  ,[SKU] = @SKU
		  ,[Description] = @Description
		  ,[OrganizationId] = @OrganizationId
		  ,[ServiceTypeId] = @ServiceTypeId
		  ,[UnitTypeId] = @UnitTypeId
		  ,[UnitCost] = @UnitCost
		  ,[EstimatedDuration] = @EstimatedDuration
		  ,[isDeleted] = @isDeleted
		  ,[ModifiedBy] = @ModifiedBy
		  ,[DateModified] = @datNow

	 WHERE Id = @Id


END
GO
