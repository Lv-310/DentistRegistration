IF object_id('spGetAlergiesByPatientId') IS NULL
    EXEC ('create procedure dbo.spGetAlergiesByPatientId as select 1')
GO
alter procedure dbo.spGetAlergiesByPatientId
@PatientId int
as
begin
declare @infoid int;
set @infoid = (select id from PatientInfo where PatientId=@PatientId);
select Id, AlergieName from Alergies where id in (select AlergieId from PatientAlergies where PatientInfoId = @infoid)
end
GO

IF object_id('spGetInfoFieldsByPatientId') IS NULL
    EXEC ('create procedure dbo.spGetInfoFieldsByPatientId as select 1')
GO
alter procedure dbo.spGetInfoFieldsByPatientId
@PatientId int
as
begin
declare @infoid int;
set @infoid = (select id from PatientInfo where PatientId=@PatientId);
select i.ID, i.FieldName, iv.FieldValue from InfoField i join PatientInfoValues iv on i.ID = iv.InfoFieldId and iv.PatientInfoId = @PatientId
end
GO