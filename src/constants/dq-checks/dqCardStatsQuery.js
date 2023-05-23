module.exports = {
  "total-cells": `select count(distinct  Filename) as TotalCells
                    FROM [info].[LoadDetailLog] Where TaskName in ('NumberoFilesCheck','FileSizeCheck','FileNameCheck','FileDelimiterCheck',
                    'FileEncodingCheck','ConstraintCheck','LastPeriodDeliveredCheck','DimvsTransTagsCheck','SchemaCheck');
    `,
  "total-files": `select  sum((LEN(LogMessage) - LEN(REPLACE(LogMessage,'|',''))) + 1) AS TotalFiles FROM [info].[LoadDetailLog] 
                    Where TaskName in ('FileNameCheck') AND LogMessage like '%|%';`,

  "fv-success-rate": `SELECT (SUM(CASE WHEN OverallStatus = 'Success' THEN 1 ELSE 0 END) * 1.0 / COUNT(*)) AS Success_Rate FROM (
                        SELECT Country, Category, Country + ' ' + Category AS CellDatabase,LDL.TaskName as QualityCheckDetail,ll.FileName,DATENAME(m,LoadStartTime)+'-'+CAST(YEAR(LoadStartTime) 
                        AS varchar(10)) AS DeliveryPeriod,PipelineStatus as OverallStatus, LDL.MessageType,LDL.LogMessage FROM info.loadlog LL JOIN info.LoadDetailLog LDL ON LL.LogId=LDL.LogId
                        WHERE LoadDesc='Extraction Pipeline' or LoadDesc='Data Quality Check Pipeline' )x`,

  "average-fv-error": `SELECT AVG(CASE WHEN OverallStatus = 'Failure' THEN 1.0 ELSE 0 END) AS AverageFailureRate FROM (SELECT Country, Category, Country + ' ' + Category AS CellDatabase,LDL.TaskName as QualityCheckDetail,ll.FileName,DATENAME(m,LoadStartTime)+'-'+CAST(YEAR(LoadStartTime) AS varchar(10)) AS DeliveryPeriod,PipelineStatus as OverallStatus,
                         LDL.MessageType,LDL.LogMessage FROM info.loadlog LL JOIN info.LoadDetailLog LDL ON LL.LogId=LDL.LogId WHERE LoadDesc='Extraction Pipeline' or LoadDesc='Data Quality Check Pipeline')x`,

  "dq-score": `SELECT (SUM(CASE WHEN Overall_Status = 'Success' THEN 1 ELSE 0 END) * 1.0/ COUNT(*)) AS SuccessRate FROM ( SELECT Country, Category,concat(Country, '  ', Category)
                as CellDatabase,zipFile,DeliveryPeriod,Overall_Status, Checks_Passed, Checks_Failed, LogMessage as Remarks FROM ( select *, CASE when x.Checks_Failed=0 then 'Success' else 'Failure' END as Overall_Status
                from ( select base.Country as Country, base.Category as Category,base.Filename as zipFile,DATENAME(m,LoadStartTime)+'-'+CAST(YEAR(LoadStartTime) AS varchar(10)) AS DeliveryPeriod,
                LogDate,MessageType,A.LogId,LogMessage,TaskName,(LEN(MessageType) - LEN(REPLACE(MessageType, 'Success', '')))  / 7 AS Checks_Passed, (LEN(MessageType) - LEN(REPLACE(MessageType, 'Error', '')))  / 5
                AS Checks_Failed from [info].[LoadDetailLog] A join info.LoadLog base on base.LogId=A.LogId where A.TaskName in ('NumberoFilesCheck','FileSizeCheck','FileNameCheck','FileDelimiterCheck',
                'FileEncodingCheck','ConstraintCheck','LastPeriodDeliveredCheck','DimvsTransTagsCheck','SchemaCheck'))x)A PIVOT (COUNT(A.TaskName) FOR TaskName in ( NumberoFilesCheck,FileSizeCheck,
                FileNameCheck,FileDelimiterCheck, FileEncodingCheck,ConstraintCheck,LastPeriodDeliveredCheck,DimvsTransTagsCheck,SchemaCheck)) AS PivotTable)x`,

  "total-dq-score": `SELECT (SUM(CASE WHEN Overall_Status = 'Success' THEN 1 ELSE 0 END) * 1.0/ COUNT(*)) AS SuccessRate FROM (SELECT Country, Category,concat(Country, '  ', Category)
                       as CellDatabase,zipFile,DeliveryPeriod,Overall_Status, Checks_Passed, Checks_Failed, LogMessage as Remarks FROM ( select *, CASE when x.Checks_Failed=0 then 'Success' else 'Failure' 
                       END as Overall_Status from ( select base.Country as Country, base.Category as Category,base.Filename as zipFile,DATENAME(m,LoadStartTime)+'-'+CAST(YEAR(LoadStartTime) AS varchar(10)) 
                       AS DeliveryPeriod, LogDate,MessageType,A.LogId,LogMessage,TaskName,(LEN(MessageType) - LEN(REPLACE(MessageType, 'Success', '')))  / 7 AS Checks_Passed, (LEN(MessageType) - 
                       LEN(REPLACE(MessageType, 'Error', '')))  / 5 AS Checks_Failed from [info].[LoadDetailLog] A join info.LoadLog base on base.LogId=A.LogId where A.TaskName in 
                       ('NumberoFilesCheck','FileSizeCheck','FileNameCheck','FileDelimiterCheck', 'FileEncodingCheck','ConstraintCheck','LastPeriodDeliveredCheck','DimvsTransTagsCheck','SchemaCheck'))x)A
                        PIVOT (COUNT(A.TaskName) FOR TaskName in ( NumberoFilesCheck,FileSizeCheck,FileNameCheck,FileDelimiterCheck, FileEncodingCheck,ConstraintCheck,LastPeriodDeliveredCheck,
                        DimvsTransTagsCheck,SchemaCheck) ) AS PivotTable )x Where DataProvider = 'Nielsen'`,
};
