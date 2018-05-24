IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES 
           WHERE TABLE_NAME = 'PRICES ')
IF COL_LENGTH('PRICES','DATE_END_PRICE') IS NOT NULL
BEGIN
	ALTER TABLE PRICES
	DROP COLUMN DATE_END_PRICE
END;

GO

IF object_id('spCheckService') IS NULL
    EXEC ('create procedure dbo.spCheckService as select 1')
GO
ALTER PROCEDURE dbo.spCheckService
@NAME_SERVICE NVARCHAR(50), @COUNT INT OUTPUT
AS
BEGIN
SELECT @COUNT = count(*) 
FROM SERVICES
WHERE LOWER(NAME_SERVICE) = (@NAME_SERVICE)
END;

GO

IF object_id('spCheckDate') IS NULL
    EXEC ('create procedure dbo.spCheckDate  as select 1')
GO
ALTER PROCEDURE spCheckDate
@DATE_START_PRICE DATE, @RESULT BIT OUTPUT
AS
BEGIN
IF (@DATE_START_PRICE > (select cast(getdate() as date)) AND (Select count(*) from Prices where DATE_START_PRICE = @DATE_START_PRICE) = 0)
	set @Result=1
ELSE set @Result=0
END;

GO

IF object_id('spGetService') IS NULL
    EXEC ('create procedure dbo.spGetService as select 1')
GO
ALTER PROCEDURE dbo.spGetService
AS
BEGIN
SELECT * FROM SERVICES
ORDER BY NAME_SERVICE 
END;

GO

IF object_id('spGetPricesByService') IS NULL
    EXEC ('create procedure dbo.spGetPricesByService as select 1')
GO
ALTER PROCEDURE dbo.spGetPricesByService
@SERVICE_ID INT
AS
BEGIN
SELECT * FROM PRICES
WHERE SERVICE_ID = @SERVICE_ID
ORDER BY DATE_START_PRICE DESC
END;

GO

IF object_id('spCheckDateForEdit') IS NULL
    EXEC ('create procedure dbo.spCheckDateForEdit  as select 1')
GO
ALTER PROCEDURE spCheckDateForEdit
@DATE_START_PRICE DATE, @RESULT NVARCHAR(30) OUTPUT
AS
BEGIN
IF (@DATE_START_PRICE > (select cast(getdate() as date)))
	set @Result='edit'
ELSE IF (@DATE_START_PRICE = (select cast(getdate() as date)) AND (Select count(*) from Prices where DATE_START_PRICE = DATEADD(day,1,@DATE_START_PRICE)) = 0)
	set @Result='add'
ELSE IF (@DATE_START_PRICE = (select cast(getdate() as date)) AND (SELECT COUNT(*) FROM PRICES WHERE DATE_START_PRICE = DATEADD(day,1,@DATE_START_PRICE)) >= 1)
	set @RESULT = 'editnextday'
ELSE set @Result='false'
END;

GO

IF object_id('spGetDoctorById') IS NULL
    EXEC ('create procedure dbo.spGetDoctorById as select 1')
GO
ALTER PROCEDURE dbo.spGetDoctorById
@ID_DOCTOR INT
AS
BEGIN
SELECT * FROM DOCTORS
WHERE ID_DOCTOR = @ID_DOCTOR
END;

GO

IF object_id('spEditPrice') IS NULL
    EXEC ('create procedure dbo.spEditPrice  as select 1')
GO
ALTER PROCEDURE spEditPrice
@SERVICE_ID INT, @PRICE INT, @DATE_START_PRICE DATE
AS
BEGIN
UPDATE PRICES
SET PRICE = @PRICE, DATE_START_PRICE = @DATE_START_PRICE, SERVICE_ID = @SERVICE_ID
WHERE DATE_START_PRICE = @DATE_START_PRICE
END;

GO

IF object_id('spEditNextDayPrice') IS NULL
    EXEC ('create procedure dbo.spEditNextDayPrice  as select 1')
GO
ALTER PROCEDURE spEditNextDayPrice
@SERVICE_ID INT, @PRICE INT, @DATE_START_PRICE DATE
AS
BEGIN
UPDATE PRICES
SET PRICE = @PRICE, DATE_START_PRICE = @DATE_START_PRICE, SERVICE_ID = @SERVICE_ID
WHERE DATE_START_PRICE = @DATE_START_PRICE
END;
