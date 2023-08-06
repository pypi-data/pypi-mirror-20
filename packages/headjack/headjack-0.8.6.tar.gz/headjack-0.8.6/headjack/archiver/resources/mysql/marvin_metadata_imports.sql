
## CREATE web_articles
CREATE TABLE IF NOT EXISTS `web_articles` (
  `primaryId` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'An internal counter',
  `dateCreated` datetime DEFAULT NULL,
  `kind` varchar(100) CHARACTER SET latin1 DEFAULT 'webpage',
  `subtype` varchar(100) CHARACTER SET latin1 DEFAULT NULL,
  `title` varchar(200) CHARACTER SET latin1 DEFAULT NULL,
  `url` varchar(500) CHARACTER SET latin1 DEFAULT NULL,
  `url_status` varchar(100) CHARACTER SET latin1 DEFAULT NULL,
  `original_yaml_path` varchar(300) CHARACTER SET latin1 DEFAULT NULL,
  `author` varchar(100) CHARACTER SET latin1 DEFAULT NULL,
  `downloaded` tinyint(4) DEFAULT '0',
  `titleAdded` tinyint(4) DEFAULT '0',
  `workflowStage` varchar(45) CHARACTER SET latin1 DEFAULT 'reading',
  `rating` tinyint(4) DEFAULT NULL,
  `notes` longblob,
  `epubCreated` datetime DEFAULT NULL,
  `dateLastModified` datetime DEFAULT NULL,
  `updated` tinyint(4) DEFAULT NULL,
  `dropboxPath` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`primaryId`),
  UNIQUE KEY `url_kind` (`url`,`kind`),
  UNIQUE KEY `url` (`url`)
) ENGINE=MyISAM AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


## CREATE web_article_annotations
CREATE TABLE IF NOT EXISTS `web_article_annotations` (
  `articleId` bigint(20) NOT NULL,
  `annotation` text COLLATE utf8_unicode_ci NOT NULL,
  `annotationIndex` bigint(20) NOT NULL,
  `colour` int(11) DEFAULT NULL,
  `markupType` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `photoUUID` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `flickrPhotoId` BIGINT(20) DEFAULT NULL,
  `flickrMMDImageLink` text COLLATE utf8_unicode_ci,
  UNIQUE KEY `articleId_annotationIndex` (`articleId`,`annotationIndex`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


## CREATE web_article_tags
CREATE TABLE IF NOT EXISTS `web_article_tags` (
  `articleId` bigint(20) NOT NULL,
  `tag` varchar(70) COLLATE utf8_unicode_ci NOT NULL,
  UNIQUE KEY `articleId_tag_unique` (`articleId`,`tag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


alter table Marvin_Books convert to character set utf8mb4 collate utf8mb4_unicode_ci;
alter table Marvin_JournalEntries convert to character set utf8mb4 collate utf8mb4_unicode_ci;
alter table Marvin_Subjects convert to character set utf8mb4 collate utf8mb4_unicode_ci;
alter table Marvin_Tags convert to character set utf8mb4 collate utf8mb4_unicode_ci;

## IMPORT THE WEB-ARTICLE RATINGS & TITLES
update web_articles w, Marvin_Books m set w.rating = m.rating, w.title = m.title, w.workflowStage = "read" where m.Filename = SUBSTRING_INDEX(w.dropboxPath,'/',-1) and m.isRead = 1 and w.workflowStage = "reading";

## IMPORT TAGS FROM HIGHLIGHTS & JOURNAL ENTRIES
INSERT IGNORE INTO web_article_tags (articleId, tag) SELECT distinct w.primaryId, t.tag FROM Marvin_Tags t, Marvin_JournalEntries j, Marvin_Books b, web_articles w where t.EntryUUID = j.UUID and j.BookFileHash = b.FileHash and b.isRead = 1 and b.Filename = SUBSTRING_INDEX(w.dropboxPath,'/',-1);

## ALSO IMPORT BOOK SUBJECTS AS TAGS
INSERT IGNORE INTO web_article_tags (articleId, tag)  SELECT distinct w.primaryId, t.Subject FROM Marvin_Subjects t, Marvin_Books b, web_articles w where t.BookFileHash = b.FileHash and b.isRead = 1 and b.Filename = SUBSTRING_INDEX(w.dropboxPath,'/',-1);

## INSERT ANNOTATIONS AS MARKDOWN
Insert IGNORE into web_article_annotations (articleId, annotation, annotationIndex, colour) SELECT primaryId, SelectionText as annotation, SelectionSectionIndex*1000000000+SelectionStart as annotationIndex, colour FROM Marvin_JournalEntries j, Marvin_Books b, web_articles w where j.BookFileHash = b.FileHash and b.isRead = 1 and b.Filename = SUBSTRING_INDEX(w.dropboxPath,'/',-1) and colour != 0 and SelectionText is not null and Type != 1;

## ADD PHOTOS
Insert IGNORE into web_article_annotations (articleId, annotation, annotationIndex, markupType, photoUUID) SELECT primaryId, EntryText as annotation, SelectionSectionIndex*1000000000+SelectionStart as annotationIndex, "image" as markupType, j.UUID as photoUUID FROM Marvin_JournalEntries j, Marvin_Books b, web_articles w where j.BookFileHash = b.FileHash and b.isRead = 1 and b.Filename = SUBSTRING_INDEX(w.dropboxPath,'/',-1) and EntryText is not null and hasPhoto = 1 and Type != 1;

## ADD USER NOTES
Insert IGNORE into web_article_annotations (articleId, annotation, annotationIndex, markupType) SELECT primaryId, EntryText as annotation, SelectionSectionIndex*1000000000+SelectionStart as annotationIndex, "note" as markupType FROM Marvin_JournalEntries j, Marvin_Books b, web_articles w where j.BookFileHash = b.FileHash and b.isRead = 1 and b.Filename = SUBSTRING_INDEX(w.dropboxPath,'/',-1) and EntryText is not null and hasPhoto = 0 and Type != 1;



## UPDATE THE MARKUPTYPES 
## colour - value
## 5 : orange (quote)
## 4 : violet/pink (header)
## 3 : green (text)
## 2 : blue (code)
## 1 : red (bold)
## 0 : yellow (null)
update web_article_annotations set markupType = "header" where colour = 4 and (markupType != "header" or markupType is null);
update web_article_annotations set markupType = "p" where (colour = 3) and (markupType != "p" or markupType is null);
update web_article_annotations set markupType = "code-block" where colour = 2 and (markupType != "code-block" or markupType is null);
update web_article_annotations set markupType = "bold" where colour = 1 and (markupType != "bold" or markupType is null);
update web_article_annotations set markupType = "blockquote" where (colour = 5) and (markupType != "blockquote" or markupType is null);


