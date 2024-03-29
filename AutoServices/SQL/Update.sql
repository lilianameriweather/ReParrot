
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
