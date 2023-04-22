USE [ReParrot]
GO
/****** Object:  StoredProcedure [dbo].[UnitTypes_SelectAll]    Script Date: 4/22/2023 10:29:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Liliana Meriweather
-- Create date: 12/17/2022
-- Description: Look Up table for UnitTypes
-- Code Reviewer:

-- MODIFIED BY: author
-- MODIFIED DATE:12/17/2022
-- Code Reviewer: Bao Han Phung
-- Note:
-- =============================================


CREATE proc [dbo].[UnitTypes_SelectAll]


as


/*
	 execute dbo.UnitTypes_SelectAll
*/

BEGIN


	SELECT [Id]
		  ,[Name]
	  FROM [dbo].[UnitTypes]


END
GO
