USE [ReParrot]
GO
/****** Object:  StoredProcedure [dbo].[Followers_Select_ByUser]    Script Date: 4/22/2023 10:29:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author: Liliana Meriweather
-- Create date: 1/20/2023
-- Description:	Selects All, Not Paginated, joins on Organizations, alphabetical by org
-- Code Reviewer: Isaiah Lewis


-- MODIFIED BY: author
-- MODIFIED DATE: 1/20/2023
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[Followers_Select_ByUser]
						@UserId int

/*--------------------TEST---------------------

DECLARE @UserId int = 87

EXECUTE dbo.followers_Select_ByUser @UserId


*/

as

BEGIN		


	SELECT  f.OrganizationId
			,o.Name
			,o.Description
			,o.LogoUrl
			,o.BusinessPhone
			,o.PrimaryLocationId
			,o.SiteUrl
			

	FROM [dbo].[Followers] as f
	INNER JOIN dbo.Organizations as o
		ON f.OrganizationId = o.Id

	WHERE @UserId = UserId


END
GO
