USE LV_310_DENTISTRY;
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES 
           WHERE TABLE_NAME = 'PatientInfo')
BEGIN
	CREATE TABLE PatientInfo(
	ID INT NOT NULL IDENTITY(1,1),
	MucosalCondition nvarchar(100),
	Bite nvarchar(100),
	DoctorSupervision nvarchar(100),
	DrugUse nvarchar(100),
	Complains nvarchar(100),
	Anesthesia nvarchar(100),
	FirstVisit date,
	PatientId int not null,
	CONSTRAINT PK_PatientInfo PRIMARY KEY (ID),
	CONSTRAINT FK_Patient FOREIGN KEY(PatientId) REFERENCES USERS(ID_USER))
END;

GO

USE LV_310_DENTISTRY;
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES 
           WHERE TABLE_NAME = 'InfoField')
BEGIN
	CREATE TABLE InfoField(
	ID INT NOT NULL IDENTITY(1,1),
	FieldName nvarchar(100),
	CONSTRAINT PK_InfoField PRIMARY KEY (ID))
END;

GO

USE LV_310_DENTISTRY;
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES 
           WHERE TABLE_NAME = 'PatientInfoValues')
BEGIN
	CREATE TABLE PatientInfoValues(
	PatientInfoId int not null,
	InfoFieldId int not null,
	FieldValue bit not null,
	CONSTRAINT PK_PatientInfoValues PRIMARY KEY (PatientInfoId,InfoFieldId),
	CONSTRAINT FK_PatientInfo FOREIGN KEY(PatientInfoId) REFERENCES PatientInfo(ID),
	CONSTRAINT FK_InfoField FOREIGN KEY(InfoFieldId) REFERENCES InfoField(ID))
END;

GO

USE LV_310_DENTISTRY;
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES 
           WHERE TABLE_NAME = 'Alergies')
BEGIN
	CREATE TABLE Alergies(
	ID INT NOT NULL IDENTITY(1,1),
	AlergieName nvarchar(100),
	CONSTRAINT PK_Alergies PRIMARY KEY (ID))
END;

GO

USE LV_310_DENTISTRY;
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES 
           WHERE TABLE_NAME = 'PatientAlergies')
BEGIN
	CREATE TABLE PatientAlergies(
	PatientInfoId int not null,
	AlergieId int not null,
	CONSTRAINT PK_PatientAlergies PRIMARY KEY (PatientInfoId,AlergieId),
	CONSTRAINT FK_PatientInfo_ FOREIGN KEY(PatientInfoId) REFERENCES PatientInfo(ID),
	CONSTRAINT FK_Alergie FOREIGN KEY(AlergieId) REFERENCES Alergies(ID))
END;

GO

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES 
           WHERE TABLE_NAME = 'VisitInfo')
BEGIN
	CREATE TABLE VisitInfo(
	ID INT NOT NULL IDENTITY(1,1),
	EventId int not null,
	PriceSum int not null,
	CONSTRAINT PK_VisitInfo PRIMARY KEY (ID),
	CONSTRAINT FK_Event FOREIGN KEY(EventId) REFERENCES CALENDAR_EVENT(EVENT_ID))
END;

GO

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES 
           WHERE TABLE_NAME = 'VisitService')
BEGIN
	CREATE TABLE VisitService(
	ID INT NOT NULL IDENTITY(1,1),
	VisitId int not null,
	ServiceId int not null,
	ToothNum int not null,
	ServicePrice int not null,
	ServiceDescription nvarchar(1024),
	CONSTRAINT PK_VisitService PRIMARY KEY (ID),
	CONSTRAINT FK_Visit FOREIGN KEY(VisitId) REFERENCES VisitInfo(ID),
	CONSTRAINT FK_Service FOREIGN KEY(ServiceId) REFERENCES [SERVICES](ID_SERVICE))
END;

GO
