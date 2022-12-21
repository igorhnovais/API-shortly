--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    token text NOT NULL,
    created_at date DEFAULT now() NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    user_id integer NOT NULL,
    url text NOT NULL,
    short_url text NOT NULL,
    visit_count integer NOT NULL,
    created_at date DEFAULT now() NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    created_at date DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, 1, '564bfffb-7c6c-4b25-a8c6-c8e9743c8f1b', '2022-12-19');
INSERT INTO public.sessions VALUES (3, 4, 'a8ad53ac-4210-4139-bd4c-2f68f56b40ad', '2022-12-19');
INSERT INTO public.sessions VALUES (2, 2, '77ad0887-9ee9-4380-9e35-07c5b1cbf90d', '2022-12-19');
INSERT INTO public.sessions VALUES (4, 5, '9361208a-a5c8-4e99-91dc-ab69debecd02', '2022-12-20');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (3, 2, 'google.com', '704206', 0, '2022-12-19');
INSERT INTO public.urls VALUES (1, 2, 'https://igorhnovais.github.io/projeto-driveneats/', '7af70b', 23, '2022-12-19');
INSERT INTO public.urls VALUES (4, 2, 'google.com', '9a7455', 11, '2022-12-19');
INSERT INTO public.urls VALUES (5, 2, 'https://www.notion.so/Projeto-Shortly-API-1-7d8561c84f484fd8803565ed3c4133cf', '2b7c15', 4, '2022-12-19');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'João', 'joao@driven.com.br', '$2b$12$g24EoPfR.jVNG2PTKeXv8.ksZ/CNVe5kP0cXMUGfUX38VBQvDa.JC', '2022-12-19');
INSERT INTO public.users VALUES (2, 'Igor', 'igor@driven.com.br', '$2b$12$yDNHmLi3hX.hRsC1cHIS9uxHaikf3fFFC48icIarZmaZFwwZNlD1K', '2022-12-19');
INSERT INTO public.users VALUES (3, 'Esdrinhas', 'esdrinhas@driven.com.br', '$2b$12$9sHwwHvH8eIoNVVv7BcBtudF.8yv2TDJZAjRgMjtXoL1WnPtcwd3W', '2022-12-19');
INSERT INTO public.users VALUES (4, 'pedro', 'pedro@driven.com.br', '$2b$12$rcoHu9c/1a.XIDO8jIRuxeJMhnLluyF.FxcdN5jUJmiRFOuhdVmoi', '2022-12-19');
INSERT INTO public.users VALUES (5, 'igor', 'igor@gmail.com', '$2b$12$K8k/bIuT1z5KdEs48/fu8eSt715gozX7XyQdR7Tgq7UnvGdKQ6iyy', '2022-12-20');
INSERT INTO public.users VALUES (6, 'erick', 'erick@driven.com.br', '$2b$12$X5AfsO5Z7AulCkRvTfkqSugqoGvzUQ8HIywbVWAF5BQmaPDY1Ap0q', '2022-12-20');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 4, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 5, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 6, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: urls urls_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

