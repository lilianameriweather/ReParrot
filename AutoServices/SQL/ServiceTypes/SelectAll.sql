USE [ReParrot]
GO
/****** Object:  StoredProcedure [dbo].[ServiceTypes_SelectAll]    Script Date: 4/22/2023 10:29:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Liliana Meriweather
-- Create date: 12/17/2022
-- Description: Look Up table for ServiceTypes
-- Code Reviewer:

-- MODIFIED BY: author
-- MODIFIED DATE:12/17/2022
-- Code Reviewer: Bao Han Phung
-- Note:
-- =============================================

CREATE proc [dbo].[ServiceTypes_SelectAll]
			

as


/*
 execute dbo.ServiceTypes_SelectAll
*/

BEGIN


	SELECT [Id]
		  ,[Name]
	  FROM [dbo].[ServiceTypes]



END
GO
