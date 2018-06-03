GO 

IF object_id('spGetCurrentPriceByServiceId') IS NULL
EXEC ('create procedure dbo.spGetCurrentPriceByServiceId as select 1')

GO

ALTER PROCEDURE spGetCurrentPriceByServiceId
@ID INT
AS
BEGIN
SELECT PRICE FROM dbo.PRICES
WHERE SERVICE_ID = @ID AND DATE_START_PRICE=(
SELECT MAX(DATE_START_PRICE) FROM dbo.PRICES 
WHERE SERVICE_ID = @ID  AND DATE_START_PRICE <= GETDATE());

END;
