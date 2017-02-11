-- MySQL dump 10.13  Distrib 5.7.12, for Win32 (AMD64)
--
-- Host: localhost    Database: cev_dashboard
-- ------------------------------------------------------
-- Server version	5.7.14

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `galeria`
--

DROP TABLE IF EXISTS `galeria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `galeria` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `nome` text NOT NULL,
  `titulo` text NOT NULL,
  `descricao` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `galeria`
--

LOCK TABLES `galeria` WRITE;
/*!40000 ALTER TABLE `galeria` DISABLE KEYS */;
/*!40000 ALTER TABLE `galeria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `galeria_imagens`
--

DROP TABLE IF EXISTS `galeria_imagens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `galeria_imagens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_galeria` int(11) DEFAULT NULL,
  `nome` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_galeriaimagens_idx` (`id_galeria`),
  CONSTRAINT `fk_galeriaimagens` FOREIGN KEY (`id_galeria`) REFERENCES `galeria` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `galeria_imagens`
--

LOCK TABLES `galeria_imagens` WRITE;
/*!40000 ALTER TABLE `galeria_imagens` DISABLE KEYS */;
/*!40000 ALTER TABLE `galeria_imagens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grupos`
--

DROP TABLE IF EXISTS `grupos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `grupos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `descricao` varchar(100) DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT '0',
  `restricao` int(1) DEFAULT '0' COMMENT 'Se 1, nao permite excluir.',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1 COMMENT='Definicao da Tabela de Grupos';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grupos`
--

LOCK TABLES `grupos` WRITE;
/*!40000 ALTER TABLE `grupos` DISABLE KEYS */;
INSERT INTO `grupos` VALUES (1,'Administrador','Grupo de Acesso total as funcionalidades do sistema',1,1),(7,'Site','Grupo de Acesso apenas aos conteúdos do site',1,0);
/*!40000 ALTER TABLE `grupos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grupos_permissoes`
--

DROP TABLE IF EXISTS `grupos_permissoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `grupos_permissoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_grupo` int(11) NOT NULL,
  `id_permissao` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_grupos_permissoes_grupos_id_idx` (`id_grupo`),
  KEY `fk_grupos_permissoes_permissoes_id_idx` (`id_permissao`),
  CONSTRAINT `fk_grupo_permissao` FOREIGN KEY (`id_grupo`) REFERENCES `grupos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_perm_permissao` FOREIGN KEY (`id_permissao`) REFERENCES `permissoes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1 COMMENT='Definicao da Tabela de Relacionamento de Grupos e Permissoes';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grupos_permissoes`
--

LOCK TABLES `grupos_permissoes` WRITE;
/*!40000 ALTER TABLE `grupos_permissoes` DISABLE KEYS */;
INSERT INTO `grupos_permissoes` VALUES (17,7,6),(24,1,4),(25,1,7),(26,1,2),(27,1,5),(28,1,6),(29,1,3),(30,1,1);
/*!40000 ALTER TABLE `grupos_permissoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grupos_programas`
--

DROP TABLE IF EXISTS `grupos_programas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `grupos_programas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_grupo` int(11) NOT NULL,
  `id_programa` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_grupo_idx` (`id_grupo`),
  KEY `fk_id_programa_idx` (`id_programa`),
  CONSTRAINT `fk_id_grupo` FOREIGN KEY (`id_grupo`) REFERENCES `grupos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_programa` FOREIGN KEY (`id_programa`) REFERENCES `programas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=latin1 COMMENT='Definicao de Relacionamento de Grupos e Programas';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grupos_programas`
--

LOCK TABLES `grupos_programas` WRITE;
/*!40000 ALTER TABLE `grupos_programas` DISABLE KEYS */;
INSERT INTO `grupos_programas` VALUES (63,7,6),(64,7,9),(65,7,7),(66,7,8),(77,1,1),(78,1,10),(79,1,4),(80,1,5),(81,1,3),(82,1,2),(83,1,6),(84,1,11),(85,1,9),(86,1,7),(87,1,8);
/*!40000 ALTER TABLE `grupos_programas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissoes`
--

DROP TABLE IF EXISTS `permissoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permissoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `controlador` varchar(45) NOT NULL,
  `descricao` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1 COMMENT='Definicao da Tabela de Permissoes relacionadas aos Grupos de Usuarios';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissoes`
--

LOCK TABLES `permissoes` WRITE;
/*!40000 ALTER TABLE `permissoes` DISABLE KEYS */;
INSERT INTO `permissoes` VALUES (1,'Usuários','usuarios','Permite visualizar usuários do sistema'),(2,'Grupos','grupos','Permite visualizar grupos do sistema'),(3,'Programas','programas','Permite visualizar programas do sistema'),(4,'Backup','backup','Realizar Backup do Banco de Dados'),(5,'Permissões','permissoes','Permite visualizar programa Permissões'),(6,'Portfolio','portfolio','Permite visualizar programa Portfolio'),(7,'Galeria','galeria','Permite gerenciar galeria de imagens');
/*!40000 ALTER TABLE `permissoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissoes_regras`
--

DROP TABLE IF EXISTS `permissoes_regras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permissoes_regras` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_permissao` int(11) NOT NULL,
  `chave` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_grupos_permissoes_permissoes_regras_id_idx` (`id_permissao`),
  CONSTRAINT `fk_perm_permissao_regras` FOREIGN KEY (`id_permissao`) REFERENCES `permissoes` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=latin1 COMMENT='Definicao da Tabela de Regras ou Acoes relacionadas a Permissoes';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissoes_regras`
--

LOCK TABLES `permissoes_regras` WRITE;
/*!40000 ALTER TABLE `permissoes_regras` DISABLE KEYS */;
INSERT INTO `permissoes_regras` VALUES (42,3,'listar'),(43,3,'novo'),(44,3,'editar'),(45,3,'salvar'),(46,3,'excluir'),(52,1,'listar'),(53,1,'editar'),(54,1,'salvar'),(55,1,'excluir'),(56,1,'novo'),(61,2,'listar'),(62,2,'novo'),(63,2,'salvar'),(64,2,'excluir'),(65,2,'editar'),(66,5,'listar'),(67,5,'editar'),(68,5,'excluir'),(69,5,'salvar'),(70,5,'novo'),(76,7,'listar'),(77,7,'novo'),(78,7,'editar'),(79,7,'excluir');
/*!40000 ALTER TABLE `permissoes_regras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `programas`
--

DROP TABLE IF EXISTS `programas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `programas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `descricao` varchar(100) DEFAULT NULL,
  `icone` varchar(45) DEFAULT NULL,
  `url` varchar(45) NOT NULL,
  `parent` int(11) DEFAULT NULL,
  `status` int(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1 COMMENT='Definicao da Tabela de Programas que um Grupo pode ver';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `programas`
--

LOCK TABLES `programas` WRITE;
/*!40000 ALTER TABLE `programas` DISABLE KEYS */;
INSERT INTO `programas` VALUES (1,'Administração','Programa de Adminstração da Área Administrativa','fa-gears','admin',0,1),(2,'Usuários','Programa de Gerenciamento de Usuários','fa-user','usuarios',1,1),(3,'Programas','Programa de Gerencimento de Programas','fa-code','programas',1,1),(4,'Grupos','Programa de Gerenciamento de Grupos','fa-group','grupos',1,1),(5,'Permissões','Programa de Gerenciamento de Permissões concedidas aos Grupos','fa-key','permissoes',1,1),(6,'Site','Programa de Gerenciamento de Conteúdos do Site','fa-globe','site',0,1),(7,'Serviços','Programa de Gerenciamento de Conteúdos referentes a Serviços','fa-suitcase','servicos',6,1),(8,'Sobre','Programa de Gerenciamento de Conteúdos referentes a Empresa','fa-connectdevelop','sobre',6,1),(9,'Portfolio','Programa de Gerenciamento de Conteúdos referentes ao Portfolio','fa-file-picture-o','portfolio',6,1),(10,'Backup','Programa de Backup da Base de Dados','fa-database','backup',1,1),(11,'Galeria de Imagens','Programa para Upload e gerenciamento de Imagens','fa-file-photo-o','galeria',6,1);
/*!40000 ALTER TABLE `programas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(60) NOT NULL,
  `status` int(1) NOT NULL DEFAULT '0',
  `token` varchar(80) DEFAULT NULL,
  `time_expired` datetime DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `profissao` varchar(45) DEFAULT NULL,
  `id_grupo` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_grupo_id_idx` (`id_grupo`),
  CONSTRAINT `fk_grupo_usuario` FOREIGN KEY (`id_grupo`) REFERENCES `grupos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COMMENT='Tabela de Usuarios';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Carlos Vargas','cev@outlook.com','$2y$08$bXUxTbqyIFkARg34ndl.xuO1tOw9m3DGGAGcHFR0tVJxj8tDMmjwq',1,NULL,NULL,'13968ef63140fff10d406bba31e7adb8.jpg','cev123',1),(3,'Teste da Silva','teste@teste.com','$2y$08$bXUxTbqyIFkARg34ndl.xuO1tOw9m3DGGAGcHFR0tVJxj8tDMmjwq',1,NULL,NULL,'',NULL,7),(4,'Novo teste','tumow@dlemail.ru','$2y$08$.OTUoH.K2BvfBkxTkvLjZ.zOlMYKRyyPRM.pka/9B24GkqGwrTRwm',1,NULL,NULL,NULL,NULL,7);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-02-11 12:16:15
