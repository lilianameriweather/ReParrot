USE [ReParrot]
GO
/****** Object:  StoredProcedure [dbo].[Followers_Select_Count_ByOrgId]    Script Date: 4/22/2023 10:29:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Liliana Meriweather
-- Create date: 1/20/2023
-- Description: returns an integer count of current followers
-- Code Reviewer: Isaiah Lewis


-- MODIFIED BY: author
-- MODIFIED DATE: 1/20/2023
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[Followers_Select_Count_ByOrgId]
						@OrganizationId int

/*-----------------TEST-----------------------

DECLARE @OrganizationId int = 4

EXECUTE dbo.followers_Select_Count_ByOrgId
		@OrganizationId

SELECT * FROM dbo.Followers

*/

as

BEGIN 

	SELECT COUNT(UserId) as followCount

	FROM [dbo].[Followers]

	WHERE @OrganizationId = OrganizationId

END
GO
