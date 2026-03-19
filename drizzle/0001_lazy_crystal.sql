CREATE TABLE `shows` (
	`id` varchar(36) NOT NULL,
	`userId` int NOT NULL,
	`nomeShow` text NOT NULL,
	`dataShow` timestamp NOT NULL,
	`localShow` text NOT NULL,
	`responsavelShow` text NOT NULL,
	`categoria` varchar(100) NOT NULL,
	`instrumento` varchar(100) NOT NULL,
	`linkRepertorio` text,
	`textoRepertorio` text,
	`fotoUrls` json DEFAULT ('[]'),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `shows_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `trilhas` (
	`id` varchar(36) NOT NULL,
	`userId` int NOT NULL,
	`nomeTrilha` text NOT NULL,
	`nomeCompositor` text NOT NULL,
	`coautores` json DEFAULT ('[]'),
	`dataVeiculacao` timestamp NOT NULL,
	`tipoObra` varchar(100) NOT NULL,
	`categoriaExecucao` varchar(100) NOT NULL,
	`categoriaOutros` text,
	`nomePrograma` text NOT NULL,
	`veiculo` varchar(100) NOT NULL,
	`cueSheetUrl` text,
	`video` text,
	`contratoUrl` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `trilhas_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `uploads` (
	`id` varchar(36) NOT NULL,
	`userId` int NOT NULL,
	`fileName` text NOT NULL,
	`fileUrl` text NOT NULL,
	`fileKey` text NOT NULL,
	`fileType` varchar(50) NOT NULL,
	`relatedId` varchar(36),
	`relatedType` varchar(50),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `uploads_id` PRIMARY KEY(`id`)
);
