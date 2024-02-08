-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: film_cult
-- ------------------------------------------------------
-- Server version	8.0.23

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

--
-- Table structure for table `episodios`
--

DROP TABLE IF EXISTS `episodios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `episodios` (
  `id_episodio` int NOT NULL AUTO_INCREMENT,
  `id_serie` int NOT NULL,
  `id_temporada` int NOT NULL,
  `nome` varchar(200) DEFAULT NULL,
  `genero` varchar(200) DEFAULT NULL,
  `realizador` varchar(200) DEFAULT NULL,
  `elenco` varchar(200) DEFAULT NULL,
  `descricao` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`id_episodio`),
  UNIQUE KEY `id_UNIQUE` (`id_episodio`),
  KEY `series_fk` (`id_serie`),
  KEY `temporadas_fk` (`id_temporada`),
  CONSTRAINT `series_fk` FOREIGN KEY (`id_serie`) REFERENCES `series` (`id_serie`) ON DELETE CASCADE,
  CONSTRAINT `temporadas_fk` FOREIGN KEY (`id_temporada`) REFERENCES `temporadas` (`id_temporada`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `episodios`
--

LOCK TABLES `episodios` WRITE;
/*!40000 ALTER TABLE `episodios` DISABLE KEYS */;
INSERT INTO `episodios` VALUES (11,11,11,'Episode 1','Drama','HBO','Zendaya','Zendaya eats a carrot');
/*!40000 ALTER TABLE `episodios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favoritos`
--

DROP TABLE IF EXISTS `favoritos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favoritos` (
  `id_favoritos` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(200) NOT NULL,
  `imagem` varchar(200) NOT NULL,
  `id_reference` varchar(400) NOT NULL,
  PRIMARY KEY (`id_favoritos`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favoritos`
--

LOCK TABLES `favoritos` WRITE;
/*!40000 ALTER TABLE `favoritos` DISABLE KEYS */;
INSERT INTO `favoritos` VALUES (15,'Joker','https://upload.wikimedia.org/wikipedia/pt/thumb/6/63/Joker_%282019%29.jpg/250px-Joker_%282019%29.jpg','16'),(17,'Guardians of the Galaxy','https://m.media-amazon.com/images/M/MV5BMTAwMjU5OTgxNjZeQTJeQWpwZ15BbWU4MDUxNDYxODEx._V1_.jpg','17'),(21,'Dallas Buyers Club ','https://moviesense.files.wordpress.com/2020/03/03f69-dallasbuyersclub5.jpg?w=1140','13'),(22,'BlacKkKlansman ','https://m.media-amazon.com/images/M/MV5BMjUyOTE1NjI0OF5BMl5BanBnXkFtZTgwMTM4ODQ5NTM@._V1_.jpg','14');
/*!40000 ALTER TABLE `favoritos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `filmes`
--

DROP TABLE IF EXISTS `filmes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `filmes` (
  `id_filme` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(200) DEFAULT NULL,
  `genero` varchar(200) DEFAULT NULL,
  `realizador` varchar(200) DEFAULT NULL,
  `elenco` varchar(200) DEFAULT NULL,
  `descricao` varchar(400) DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `imagem` varchar(400) NOT NULL,
  `trailer` varchar(400) NOT NULL,
  PRIMARY KEY (`id_filme`),
  UNIQUE KEY `id_UNIQUE` (`id_filme`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `filmes`
--

LOCK TABLES `filmes` WRITE;
/*!40000 ALTER TABLE `filmes` DISABLE KEYS */;
INSERT INTO `filmes` VALUES (11,'Pulp Fiction','Crime/Drama','Quentin Tarantino','John Travolta,Samuel L. Jackson','1994 ',9,'https://cdn.europosters.eu/image/750/posters/pulp-fiction-cover-i1288.jpg','https://youtu.be/tGpTpVyI_OQ'),(12,'Fight Club','Crime','David Fincher','Brad Pitt','1999 ',9,'https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY1200_CR85,0,630,1200_AL_.jpg','https://www.youtube.com/embed/qtRKdVHc-cEype'),(13,'Dallas Buyers Club ','Drama','Jean-Marc Vallée','Matthew McConaughey','2013',8,'https://moviesense.files.wordpress.com/2020/03/03f69-dallasbuyersclub5.jpg?w=1140','https://www.youtube.com/embed/U8utPuIFVnU'),(14,'BlacKkKlansman ','Crime/Drama','Spike Lee','Ron Stallworth','2018',8,'https://m.media-amazon.com/images/M/MV5BMjUyOTE1NjI0OF5BMl5BanBnXkFtZTgwMTM4ODQ5NTM@._V1_.jpg','https://www.youtube.com/embed/pFc6I0rgmgY'),(15,'Wonder Woman','Adventure','Patty Jenkins','Gal Gadot','2013',8,'https://m.media-amazon.com/images/M/MV5BMTYzODQzYjQtNTczNC00MzZhLTg1ZWYtZDUxYmQ3ZTY4NzA1XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg','https://www.youtube.com/embed/XW2E2Fnh52w'),(16,'Joker','Crime/Drama','Joaquin Phoenix','Joaquin Phoenix','2019',8,'https://upload.wikimedia.org/wikipedia/pt/thumb/6/63/Joker_%282019%29.jpg/250px-Joker_%282019%29.jpg','https://www.youtube.com/embed/zAGVQLHvwOY'),(17,'Guardians of the Galaxy','Adventure','James Gunn','Chris Pratt','2014',8,'https://m.media-amazon.com/images/M/MV5BMTAwMjU5OTgxNjZeQTJeQWpwZ15BbWU4MDUxNDYxODEx._V1_.jpg','https://www.youtube.com/embed/d96cjJhvlMA');
/*!40000 ALTER TABLE `filmes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login` (
  `id_login` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_login`),
  UNIQUE KEY `id_UNIQUE` (`id_login`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES (11,'DuarteCalha','duartecalha@email.com','$2a$08$HqNjaCUuR83/C6XCbPfqaOL/2n19csgqRJKOKXeVa/iHbH3AnG/q.'),(12,'Coelhur','coelhur@email.com','$2a$08$jEv0hFW0G4lwL8YwY.Ic4.pjK76A1W7Rdd0ISOqkdGYuPANytWxm.'),(13,'Diogo2','diogosoares@email.com','$2a$08$oV3X3mqErkCcysJ9WVih0e0bddFFU7nmlZxtEumJIjsH5LXMiLNxK');
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `series`
--

DROP TABLE IF EXISTS `series`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `series` (
  `id_serie` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(200) DEFAULT NULL,
  `genero` varchar(200) DEFAULT NULL,
  `realizador` varchar(200) DEFAULT NULL,
  `elenco` varchar(200) DEFAULT NULL,
  `descricao` varchar(400) DEFAULT NULL,
  `temporadas` int DEFAULT NULL,
  `episodios` int DEFAULT NULL,
  `imagem` varchar(400) NOT NULL,
  `trailer` varchar(400) NOT NULL,
  PRIMARY KEY (`id_serie`),
  UNIQUE KEY `id_UNIQUE` (`id_serie`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `series`
--

LOCK TABLES `series` WRITE;
/*!40000 ALTER TABLE `series` DISABLE KEYS */;
INSERT INTO `series` VALUES (11,'Euphoria','Drama','HBO','Zendaya','2019',1,10,'https://m.media-amazon.com/images/M/MV5BMDMzZDkyNzEtYTY5Ni00NzlhLWI4MzUtY2UzNjNmMjI1YzIzXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpgc','https://www.youtube.com/watch?v=6XGnv7Zgbeg');
/*!40000 ALTER TABLE `series` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `temporadas`
--

DROP TABLE IF EXISTS `temporadas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `temporadas` (
  `id_temporada` int NOT NULL AUTO_INCREMENT,
  `id_serie` int NOT NULL,
  `nome` varchar(200) DEFAULT NULL,
  `realizador` varchar(200) DEFAULT NULL,
  `elenco` varchar(200) DEFAULT NULL,
  `descricao` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`id_temporada`),
  UNIQUE KEY `id_UNIQUE` (`id_temporada`),
  KEY `series2_fk` (`id_serie`),
  CONSTRAINT `series2_fk` FOREIGN KEY (`id_serie`) REFERENCES `series` (`id_serie`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `temporadas`
--

LOCK TABLES `temporadas` WRITE;
/*!40000 ALTER TABLE `temporadas` DISABLE KEYS */;
INSERT INTO `temporadas` VALUES (11,11,'Season 2','HBO','Zendaya','Zendaya overdoses');
/*!40000 ALTER TABLE `temporadas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vistos`
--

DROP TABLE IF EXISTS `vistos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vistos` (
  `id_vistos` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(200) NOT NULL,
  `imagem` varchar(400) NOT NULL,
  `id_reference` varchar(400) NOT NULL,
  PRIMARY KEY (`id_vistos`),
  UNIQUE KEY `id_UNIQUE` (`id_vistos`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vistos`
--

LOCK TABLES `vistos` WRITE;
/*!40000 ALTER TABLE `vistos` DISABLE KEYS */;
INSERT INTO `vistos` VALUES (12,'Fight Club','https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY1200_CR85,0,630,1200_AL_.jpg','undefined'),(13,'Guardians of the Galaxy','https://m.media-amazon.com/images/M/MV5BMTAwMjU5OTgxNjZeQTJeQWpwZ15BbWU4MDUxNDYxODEx._V1_.jpg','undefined');
/*!40000 ALTER TABLE `vistos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-14 19:46:50
