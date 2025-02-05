-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: bv2rebwf6zzsv341.cbetxkdyhwsb.us-east-1.rds.amazonaws.com    Database: bmaxshtg43yjjx81
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `certificate`
--

DROP TABLE IF EXISTS `certificate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `certificate` (
  `certificateId` int unsigned NOT NULL AUTO_INCREMENT,
  `resumeId` int unsigned NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `certificate` varchar(100) NOT NULL,
  `earn` date DEFAULT NULL,
  `expire` date DEFAULT NULL,
  PRIMARY KEY (`certificateId`),
  KEY `resumeId_cert_idx` (`resumeId`) /*!80000 INVISIBLE */,
  CONSTRAINT `resumeId_cert` FOREIGN KEY (`resumeId`) REFERENCES `resume` (`resumeId`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certificate`
--

LOCK TABLES `certificate` WRITE;
/*!40000 ALTER TABLE `certificate` DISABLE KEYS */;
INSERT INTO `certificate` VALUES (1,1,'UC DAVIS','Sacramento','CA','USA','.NET CORE','2022-01-01','2024-01-01'),(15,51,'CompTIA','Downers Grove','Illinois','United States','Security+','2016-11-10','2024-03-14'),(16,52,'CompTIA','Downers Grove','Illinois','United States','Security+','2024-01-14','2024-01-14'),(17,53,'CompTIA','Downers Grove','Illinois','United States','Security+','2018-10-31','2024-10-31'),(18,54,'COMTIA','Downers Grove','Illinois','United States','Security+','2014-11-13','2019-12-21');
/*!40000 ALTER TABLE `certificate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `education`
--

DROP TABLE IF EXISTS `education`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `education` (
  `educationId` int unsigned NOT NULL AUTO_INCREMENT,
  `resumeId` int unsigned NOT NULL,
  `name` varchar(100) NOT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `degree` varchar(100) NOT NULL,
  `major` varchar(100) NOT NULL,
  `start` date DEFAULT NULL,
  `grad` date DEFAULT NULL,
  `gpa` decimal(3,2) DEFAULT NULL,
  PRIMARY KEY (`educationId`),
  KEY `resumeId_edu_idx` (`resumeId`),
  CONSTRAINT `resumeId_edu` FOREIGN KEY (`resumeId`) REFERENCES `resume` (`resumeId`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `education`
--

LOCK TABLES `education` WRITE;
/*!40000 ALTER TABLE `education` DISABLE KEYS */;
INSERT INTO `education` VALUES (1,1,'CSU Monterey Bay','Seaside','CA','USA','BS','Software Engineering','2023-01-10','2024-12-15',3.98),(2,1,'ARC','Sacramento','CA','USA','AS','Computer Science','2017-01-15','2020-12-15',NULL),(20,51,'CSU, Monterey Bay','Seaside','California','United States','Bachelors of Science','Computer Science','2019-10-14','2025-01-07',3.75),(21,52,'CSU, Monterey Bay','Seaside','California','United States','Bachelors of Science','Computer Science','2024-01-14','2024-01-14',4.00),(22,53,'California State University, Monterey Bay','Seaside','California','United States','BS','Computer Science','2023-01-01','2024-12-16',4.00),(23,54,'CSUMB','Seaside','California','United States','Bachelors of Science','Computer Science','2010-01-11','2015-02-22',4.00);
/*!40000 ALTER TABLE `education` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experience`
--

DROP TABLE IF EXISTS `experience`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experience` (
  `experienceId` int unsigned NOT NULL AUTO_INCREMENT,
  `resumeId` int unsigned NOT NULL,
  `employer` varchar(100) NOT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `position` varchar(100) NOT NULL,
  `start` date DEFAULT NULL,
  `end` date DEFAULT NULL,
  `description` varchar(5000) DEFAULT NULL,
  PRIMARY KEY (`experienceId`),
  KEY `resumeId_exp_idx` (`resumeId`) /*!80000 INVISIBLE */,
  CONSTRAINT `resumeId_exp` FOREIGN KEY (`resumeId`) REFERENCES `resume` (`resumeId`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experience`
--

LOCK TABLES `experience` WRITE;
/*!40000 ALTER TABLE `experience` DISABLE KEYS */;
INSERT INTO `experience` VALUES (1,1,'EMR CPR','San Jose','CA','United States','IT Support','2015-06-10','2015-08-10','Soroush-E-Mehr was a software company that mainly produced multimedia programs, including academic\nand religious programs for PC and smartphones. I was an IT Specialist.'),(2,1,'Pegah Soft.','Tehran','','Iran','Software and Information Technology Specialist','2008-08-08','2010-08-15','Pegah Soft was a software company that produced automation software in the medical field, such as for\nmedical records and medical billings. I was a member of R&D and a programmer. I also helped the IT team, trained health care personnel, and provided help desk as necessary.'),(3,1,'Soroush-E-Mehr','Tehran','','Iran','Software Developer','2010-08-04','2012-12-19','Soroush-E-Mehr was a software company that mainly produced multimedia programs, including academic\nand religious programs for PC and smartphones. I was a member of the R&D.'),(14,51,'Microsoft','Redmond','Washington','United States','Web Developer','2022-11-12','2026-06-14','\r\n    In laoreet magna at quam commodo molestie.\r\n    Nunc lacinia tortor ut diam pellentesque finibus.\r\n    Curabitur a dolor id libero tempus iaculis eget sit amet justo.\r\n    Donec ac neque ut risus mollis facilisis.\r\n    In viverra nisl a arcu tincidunt eleifend.\r\n\r\n    Cras in turpis eget sapien lobortis rhoncus vitae ac leo.\r\n    Curabitur et diam sit amet nisl scelerisque posuere.\r\n    Vivamus vel diam id elit euismod dapibus.\r\n    Aenean varius ex non luctus porttitor.\r\n    Donec id felis non ipsum dignissim condimentum eu ut nisi.\r\n    Sed eleifend enim ac lectus consequat scelerisque.\r\n\r\n    Vivamus luctus augue in felis lacinia malesuada dictum condimentum lectus.\r\n    Etiam vitae felis vulputate, vulputate mi blandit, gravida neque.\r\n\r\n    Maecenas non augue suscipit, suscipit nulla eu, fringilla nunc.\r\n    Maecenas sit amet diam cursus, tincidunt neque et, vulputate mi.\r\n    Cras euismod lectus ac nisi gravida, vitae hendrerit augue vehicula.\r\n\r\n    Ut facilisis mi sed elit faucibus interdum.\r\n    Sed bibendum orci id faucibus efficitur.\r\n'),(15,52,'Microsoft','Redmond','Washington','United States','Web Developer','2024-01-14','2024-01-14','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'),(16,53,'Microsoft','Redmond','Washington','United States','Web Developer','2023-11-14','2030-03-15','During my tenure as a Web Developer at Microsoft, I was involved in crafting innovative web applications and services, leveraging the latest technologies such as ASP.NET, JavaScript, and Azure cloud services. My role primarily focused on the development and optimization of user-centric designs, ensuring seamless and responsive experiences across various devices and platforms.'),(17,54,'Microsoft','Redmond','Washington','United States','Web Developer','2019-11-15','2022-12-29','This is amazing.');
/*!40000 ALTER TABLE `experience` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resume`
--

DROP TABLE IF EXISTS `resume`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resume` (
  `resumeId` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `date` date NOT NULL,
  `resumeName` varchar(100) NOT NULL,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `phone` bigint unsigned NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `linkedin` varchar(200) DEFAULT NULL,
  `github` varchar(200) DEFAULT NULL,
  `other` varchar(200) DEFAULT NULL,
  `objective` varchar(1000) NOT NULL,
  PRIMARY KEY (`resumeId`),
  KEY `username_resume_idx` (`username`),
  CONSTRAINT `username_resume` FOREIGN KEY (`username`) REFERENCES `user` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resume`
--

LOCK TABLES `resume` WRITE;
/*!40000 ALTER TABLE `resume` DISABLE KEYS */;
INSERT INTO `resume` VALUES (1,'nima','2023-12-03','','Nima','Mahanloo','Fair Oaks','CA','USA',4085503362,'nima.mahanloo@yahoo.com','https://www.linkedin.com/in/nimamahanloo','https://github.com/nmahanloo','https://thoughtsandfuture.wordpress.com','New graduated Software Engineer skilled in developing front-end, modern client-side frameworks utilizing React+Redux. Seeking a position to bring an outside-of-the-box approach and exceptional ability to identify problems and create effective solutions that keep projects on track and under budget.'),(12,'zebroe','2023-12-12','','Christopher','Loi','San Jose','CA','United States',4088029319,'loichris97@gmail.com','','','','Become rich'),(51,'TestAccount2','2023-12-13','Professional Resume','John','Doe','Beverly Hills','California','United States',916,'JDoe@Outlook.com','https://www.LinkedIn.com','https://www.GitHub.com','https://www.MyWebsite.com','\r\n\r\nMauris sit amet pellentesque mauris. Pellentesque at mauris nec dolor interdum pulvinar. Duis nec ligula erat. Curabitur ornare purus et sem dapibus lobortis. Phasellus lobortis imperdiet orci, a mattis nulla. Nam facilisis nisl id tempor ultrices. Sed pulvinar fermentum tellus et fringilla. In in aliquet tortor. Pellentesque vehicula dui in ligula euismod, in aliquet purus rutrum. Pellentesque et nisi neque.\r\n\r\nCurabitur volutpat mattis justo et luctus. Donec at tincidunt diam. Mauris tincidunt nulla nunc, feugiat aliquam purus fermentum quis. Vivamus egestas eros id est facilisis luctus. Aenean pulvinar turpis eu nulla hendrerit, at bibendum quam laoreet. Maecenas varius mattis neque, vel convallis odio volutpat et. Duis ac dignissim dolor. Pellentesque congue mi at massa dictum facilisis. Donec nisi lorem, euismod nec erat quis, rhoncus sollicitudin ipsum. Cras vestibulum, lacus at efficitur ornare, justo metus viverra ex, ut tincidunt sem ipsum a tortor. Nunc sit amet magna fri'),(52,'TestAccount2','2023-12-13','Microsoft','Space','Spaceman','Beverly Hills','California','United States',9168718513,'spaceman@space.com','https://www.LinkedIn.com','https://www.GitHub.com','https://www.MyWebsite.com','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'),(53,'TestAccount2','2023-12-13','Senior Web Dev Resume','John','Doe','Beverly Hills','California','United States',916,'JDoe@Outlook.com','https://www.LinkedIn.com','https://www.GitHub.com','https://www.MyWebsite.com','Seeking a challenging role as a Senior Web Developer where I can apply my extensive experience in web application development and passion for innovative technologies. Eager to bring my proven track record of designing and implementing user-centric web solutions, gained from a fruitful tenure at Microsoft, to a dynamic team focused on cutting-edge web development.'),(54,'zebroe','2023-12-13','','John','Doe','Beverly Hills','California','United States',123,'User@Domain.com','https://www.linkedin.com/','https://github.com/','https://www.MyWebsite.com/','To become super rich');
/*!40000 ALTER TABLE `resume` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skill`
--

DROP TABLE IF EXISTS `skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skill` (
  `skillId` int unsigned NOT NULL AUTO_INCREMENT,
  `resumeId` int unsigned NOT NULL,
  `skill` varchar(100) NOT NULL,
  PRIMARY KEY (`skillId`),
  KEY `resumeId_ski_idx` (`resumeId`),
  CONSTRAINT `resumeId_ski` FOREIGN KEY (`resumeId`) REFERENCES `resume` (`resumeId`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skill`
--

LOCK TABLES `skill` WRITE;
/*!40000 ALTER TABLE `skill` DISABLE KEYS */;
INSERT INTO `skill` VALUES (1,1,'C++'),(2,1,'Python'),(3,1,'Java'),(4,1,'SQL'),(5,1,'JavaScript'),(6,1,'HTML'),(7,1,'CSS'),(8,1,'Express'),(9,1,'OS Programming'),(10,1,'Algorithms'),(11,1,'Data Structure'),(12,1,'Linux Programming'),(13,1,'Networking Programming'),(14,1,'Multithreadened Programming'),(15,1,'Object oriented Programming'),(61,51,'Programming Foundations'),(62,51,'Expert Systems'),(63,51,'Reactive.js'),(64,51,'CSS'),(65,51,'HTML'),(66,51,'Express.js'),(67,51,'MySQL'),(68,52,'Data'),(69,52,'DevOps'),(70,52,'TimeLogic'),(71,52,'HTML + HTML5'),(72,53,'HTML'),(73,53,'CSS'),(74,53,'Node.js'),(75,53,'Express.js'),(76,53,'MySQL'),(77,53,'Npm'),(78,53,'Javascript'),(79,53,'MVC Architecture'),(80,54,'Teamwork');
/*!40000 ALTER TABLE `skill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `username` varchar(50) NOT NULL,
  `password` varchar(500) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('nima','$2b$10$ktvCdPfgGJGisyn/MeibtO8X4iBSDo8zmx8Pv1PftWa8URblS7xia'),('test2','$2b$10$4lAsxvcRadiCu4wECgAtxe8W882BCW6TRRrYsiZlf.4R2Ns5U36JO'),('TestAccount','$2b$10$ttiaskKJP0bWYVX9AVakkehZfbVaIpD7faApzOr0eeIK2ZWW5gc8.'),('TestAccount2','$2b$10$DqyXPFepxkQh.qtl2ty.1u3sqWHrKcIs79JJcIHRdjhLVGfeHT3TW'),('user','$2b$10$KWzi0D6sa2qGvX4V.ATsCeda16OhyM3i4s1llsyX.6hw0iU76k7Me'),('zebroe','$2b$10$qDA/OM7gKhhCwUYGIT5L4.caOwkUsPZ4mUQhsFt83NucdbAlww9m2');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-13 17:37:44
