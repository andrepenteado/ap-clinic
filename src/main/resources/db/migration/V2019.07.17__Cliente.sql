DROP TABLE IF EXISTS Cliente CASCADE;
CREATE TABLE IF NOT EXISTS Cliente (
    Id              BIGSERIAL,
    Nome            VARCHAR(100) NOT NULL,
    CPF             VARCHAR(20)  NOT NULL,
    Data_Nascimento DATE         NOT NULL,
    Profissao       VARCHAR(100),
    Email           VARCHAR(100),
    Telefone        VARCHAR(20),
    Celular         VARCHAR(20),
    WhatsApp        BOOLEAN,
    CONSTRAINT PK_Cliente     PRIMARY KEY (Id),
    CONSTRAINT UN_Cliente_CPF UNIQUE (CPF)
);