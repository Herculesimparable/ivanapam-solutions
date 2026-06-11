(function () {
  "use strict";

  const SUPPORTED = ["pt", "en", "es", "fr"];
  const DEFAULT_LANG = "pt";

  const STRINGS = {
    pt: {
      meta: {
        description:
          "IVANAPAM Solutions — Limpeza profissional, desinfestação e sanitização em Angola. Agende já o seu serviço.",
        ogDescription:
          "Limpeza profissional e desinfestação em Angola. Agende o seu serviço online.",
      },
      nav: {
        aria: "Navegação principal",
        home: "Início",
        services: "Serviços",
        booking: "Agendamentos",
        partners: "Parceiros",
        about: "Quem Somos",
        locations: "Locais",
        gallery: "Galeria",
        contact: "Contacto",
        bookCta: "Agendar",
        openMenu: "Abrir menu",
      },
      lang: {
        aria: "Idioma",
      },
      hero: {
        bannerAlt: "IVANAPAM Solutions — Serviços de desinfestação e limpeza de interiores",
        tagline: "Limpeza profissional e desinfestação em Luanda e todo Angola",
        badge: "Luanda · Todo Angola",
        taglineMain: "Limpeza profissional e desinfestação",
        taglineSub: "Higienização de confiança, onde estiver",
        ctaBook: "Agendar Serviço",
        ctaWhatsapp: "WhatsApp",
        scroll: "Agendar serviço",
      },
      services: {
        label: "O que fazemos",
        title: "Os nossos serviços",
        intro:
          "Soluções completas de higiene, limpeza e controlo de pragas para residências, empresas e indústria.",
        book: "Agendar",
        items: {
          residential: {
            name: "Limpeza Residencial",
            desc: "Limpeza completa de casas e apartamentos com produtos seguros e equipa experiente.",
          },
          office: {
            name: "Limpeza de Escritórios",
            desc: "Ambientes de trabalho impecáveis, desinfeção de superfícies e manutenção regular.",
          },
          deep: {
            name: "Limpeza Profunda",
            desc: "Higienização intensiva de cozinhas, casas de banho, pavimentos e zonas de difícil acesso.",
          },
          disinfestation: {
            name: "Desinfestação",
            desc: "Eliminação de baratas, formigas, traças e outros insetos com métodos certificados.",
          },
          deratization: {
            name: "Desratização",
            desc: "Controlo e erradicação de roedores com iscas seguras e monitorização contínua.",
          },
          mosquito: {
            name: "Controlo de Mosquitos",
            desc: "Tratamento de áreas exteriores e interiores para reduzir mosquitos e outros vetores.",
          },
          sanitization: {
            name: "Sanitização",
            desc: "Desinfeção de ambientes, equipamentos e superfícies de contacto frequente.",
          },
          outdoor: {
            name: "Limpeza de Áreas Exteriores",
            desc: "Pátios, jardins, fachadas, estacionamentos e espaços comuns de condomínios.",
          },
        },
      },
      booking: {
        label: "Agendamentos online",
        title: "Marque o seu serviço",
        intro:
          "Selecione os serviços, preencha os dados e envie o pedido diretamente no WhatsApp.",
        search: "Pesquisar serviços",
        searchPlaceholder: "Pesquisar limpeza, desinfestação...",
        tabsAria: "Categorias de serviços",
        empty: "Nenhum serviço encontrado.",
        panelAria: "O seu agendamento",
        panelTitle: "O seu agendamento",
        close: "Fechar",
        panelEmpty: "Selecione um ou mais serviços para agendar.",
        name: "Nome completo",
        namePh: "O seu nome",
        phone: "Telefone / WhatsApp",
        phonePh: "9XX XXX XXX",
        address: "Morada / Local do serviço",
        addressPh: "Bairro, rua, referência...",
        date: "Data preferida",
        time: "Hora preferida",
        note: "Observações (opcional)",
        notePh: "Detalhes adicionais sobre o serviço...",
        whatsapp: "Enviar agendamento no WhatsApp",
        whatsappSub: "Grátis · Confirmação rápida pela equipa",
        clear: "Limpar tudo",
        callUs: "Ou ligue para mais informações:",
        remove: "Remover {name}",
        waHeader: "🧹 *NOVO AGENDAMENTO — IVANAPAM Solutions*",
        waFooter: "Enviado via www.ivanapam.com",
        step1: "Serviços",
        step2: "Dados",
        step3: "Confirmar",
        trust1: "✓ Resposta rápida no WhatsApp",
        trust2: "✓ Equipa certificada",
        trust3: "✓ Orçamento sem compromisso",
        property: "Tipo de local",
        propertyPh: "Selecione...",
        propertyRes: "Residência",
        propertyCom: "Empresa / Escritório",
        propertyInd: "Industrial / Armazém",
        propertyOther: "Outro",
        timeSlots: "Período preferido",
        morning: "Manhã",
        afternoon: "Tarde",
        evening: "Noite",
        phoneHint: "9 dígitos a começar por 9 (ex.: 925 484 438). +244 é opcional.",
        confirmHint: "Reveja os dados e envie — a nossa equipa confirma no WhatsApp.",
        openPanel: "Ver agendamento",
        stepsAria: "Progresso do agendamento",
        summaryCount: "{count} serviço(s): {names}",
        formError: "Preencha todos os campos obrigatórios corretamente.",
      },
      partners: {
        label: "Confiança",
        title: "Os nossos parceiros",
        intro: "Empresas de referência em Luanda que escolhem a IVANAPAM para manter os seus espaços limpos, higienizados e livres de pragas.",
        marqueeAria: "Carrossel infinito de logótipos dos parceiros",
        gridAria: "Grelha de logótipos dos parceiros",
        openLogo: "Ver {name} em tamanho grande",
        viewDetail: "Toque para ampliar",
        items: {
          gelsadas: {
            name: "Gelsadas",
            subtitle: "Limpeza e Desinfestação",
            tag: "Higiene profissional",
            location: "Luanda",
            desc: "Parceiro angolano em limpeza profunda, desinfestação e sanitização de lojas, escritórios e centros de produção.",
          },
          global: {
            name: "Global Services Corporation",
            subtitle: "Serviços corporativos",
            tag: "Corporativo",
            location: "Ingombota, Luanda",
            desc: "Grupo angolano de referência em mediação de seguros, formação, consultoria e eventos empresariais.",
          },
          chimbungos: {
            name: "Chimbungos Grill",
            subtitle: "Restaurante",
            tag: "Restauração",
            location: "Kilamba, Belas",
            desc: "Referência em grelhados, saladas e sobremesas na centralidade do Kilamba — ambiente acolhedor e cozinha de qualidade.",
          },
        },
      },
      about: {
        imgAlt: "Equipa IVANAPAM em ação",
        label: "Quem Somos",
        title: "Excelência em limpeza e desinfestação",
        lead: "Limpeza profissional e controlo de pragas em todo Angola — com resultados visíveis desde o primeiro dia.",
        p1: "A <strong>IVANAPAM Solutions</strong> atua em residências, empresas, restaurantes e indústria em Luanda e em todo o território nacional. Equipa formada, produtos certificados e métodos que protegem a sua saúde e o seu espaço.",
        highlightsAria: "Destaques IVANAPAM",
        h1: "Limpeza profunda, desinfestação e sanitização de interiores",
        h2: "Equipa qualificada e equipamento profissional no terreno",
        h3: "Atendimento em Luanda, Cabo Ledo, Sangano e outras províncias",
        h4: "Orçamento gratuito e confirmação rápida por WhatsApp",
        p2: "Compromisso: pontualidade, segurança e ambientes higienizados sem pragas.",
        badge1: "🇦🇴 Empresa angolana",
        badge2: "⚡ Resposta em 24h",
        badge3: "🛡️ Orçamento sem compromisso",
        liveTag: "Equipa em campo",
        stat1v: "24h",
        stat1l: "Resposta rápida",
        stat2v: "100%",
        stat2l: "Angola",
        stat3v: "PPE",
        stat3l: "Equip. certificado",
        cta: "Agendar serviço agora",
      },
      locations: {
        label: "Luanda",
        title: "Locais onde realizámos limpezas",
        intro:
          "Resorts, empresas, restaurantes e residências na província de Luanda e arredores — com equipa IVANAPAM no terreno.",
        note: "Também atendemos outras zonas de Angola. Peça orçamento sem compromisso.",
        areas: {
          luanda: "Luanda",
          caboLedo: "Cabo Ledo",
          sangano: "Sangano",
        },
        items: {
          qpoint: {
            name: "Q-Point Resort Cabo Ledo",
            desc: "Limpeza de áreas comuns, quartos e espaços exteriores do resort.",
            service: "Limpeza · Desinfestação",
          },
          sangano: {
            name: "Resort Sangano",
            desc: "Desinfestação e higienização em instalações turísticas.",
            service: "Desinfestação",
          },
          chimbungos: {
            name: "Chimbungos",
            desc: "Higienização de espaços de restauração e eventos em Luanda.",
            service: "Limpeza profunda",
          },
          gelsadas: {
            name: "Gelsadas",
            desc: "Sanitização de lojas e centros de produção.",
            service: "Sanitização",
          },
          global: {
            name: "Global Services Corporation",
            desc: "Limpeza regular em instalações corporativas.",
            service: "Limpeza corporativa",
          },
          cuca: {
            name: "CUCA",
            desc: "Higienização de áreas operacionais e industriais.",
            service: "Higienização industrial",
          },
          residencial: {
            name: "Residências em Luanda",
            desc: "Desinfestação e limpeza em casas e apartamentos.",
            service: "Desinfestação residencial",
          },
          escritorios: {
            name: "Escritórios e empresas",
            desc: "Limpeza de postos de trabalho e salas comerciais.",
            service: "Limpeza de escritórios",
          },
          edificios: {
            name: "Edifícios e condomínios",
            desc: "Limpeza de escadas, corredores e áreas comuns.",
            service: "Limpeza de edifícios",
          },
          exterior: {
            name: "Áreas exteriores",
            desc: "Limpeza de pátios, jardins e zonas exteriores.",
            service: "Limpeza exterior",
          },
        },
      },
      gallery: {
        aria: "Galeria IVANAPAM",
        label: "Galeria",
        title: "O nosso trabalho em imagens",
        intro: "Toque numa foto para ver em tamanho grande. Cada imagem mostra um serviço real da equipa IVANAPAM.",
        mosaicAria: "Grelha de fotos da galeria",
        carouselAria: "Carrossel da galeria",
        dotsAria: "Navegar fotos",
        zoom: "Ver foto",
        viewLarge: "Ver {name} em tamanho grande",
        photoOf: "Foto {n} de {total}",
        caption: "{name} — {site}",
        photos: {
          fumigacaoTermica: "Fumigação térmica — Luanda",
          desinfestacaoResidencial: "Desinfestação residencial — Luanda",
          equipaSala: "Equipa IVANAPAM em sala — Luanda",
          equipaExterior: "Desinfestação no Resort Sangano",
          limpezaPatio: "Limpeza de pátio — Luanda",
          cozinhaProfissional: "Cozinha industrial CUCA — Luanda",
          resortQpoint: "Limpeza no Q-Point Resort Cabo Ledo",
          escadasEquipa: "Limpeza de cozinha industrial — equipa IVANAPAM",
          servicosDesinfestacao: "Operação de desinfestação certificada",
          limpezaEscritorios: "Limpeza de escritórios e postos de trabalho",
          ppeDesinfeccao: "Desinfeção com equipamento de proteção individual",
          aniversario: "Celebração da equipa IVANAPAM",
          parceiros: "Parcerias com empresas de referência",
          parceiroChimbungos: "Parceria com Chimbungos",
          parceiroGelsadas: "Parceria com Gelsadas",
          parceiroGlobal: "Parceria com Global Alliance",
        },
      },
      contact: {
        label: "Fale connosco",
        title: "Contacto",
        phones: "Telefones / WhatsApp",
        email: "Email",
        web: "Website",
        instagram: "Instagram",
        hours: "Horário",
        hoursText: "Seg–Sáb: 8h–18h · Domingo: sob consulta",
        name: "Nome",
        emailField: "Email",
        subject: "Assunto",
        message: "Mensagem",
        submit: "Enviar Mensagem",
        namePh: "O seu nome",
        emailPh: "email@exemplo.com",
        subjectPh: "Como podemos ajudar?",
        messagePh: "A sua mensagem...",
      },
      footer: {
        contact: "Contacto e telefones",
        instagram: "Instagram @ivanapam_solutions",
        rights: "© 2026 IVANAPAM Solutions — Angola. Todos os direitos reservados.",
      },
      mobile: {
        aria: "Acesso rápido",
        booking: "Agendamento",
        whatsapp: "WhatsApp",
      },
      fab: {
        whatsapp: "WhatsApp",
      },
      forms: {
        error: "Por favor, preencha todos os campos corretamente.",
        contactOk: "Mensagem enviada com sucesso! Entraremos em contacto em breve.",
        bookingOk: "Agendamento preparado! Confirme o envio no WhatsApp.",
      },
      toast: {
        added: "{name} adicionado ao agendamento",
        removed: "{name} removido",
        cleared: "Agendamento limpo",
      },
      lightbox: {
        aria: "Ver imagem ampliada",
        close: "Fechar",
        prev: "Foto anterior",
        next: "Foto seguinte",
      },
      menu: {
        add: "+ Adicionar",
        remove: "− Retirar",
        addAria: "Adicionar {name} ao agendamento",
        removeAria: "Retirar {name} do agendamento",
        cat: {
          all: "Todos",
          limpeza: "Limpeza",
          desinfestacao: "Desinfestação",
          sanitizacao: "Sanitização",
        },
        badge: {
          popular: "Mais pedido",
          recommended: "Recomendado",
          premium: "Premium",
          urgent: "Urgente",
        },
        items: {
          residential: {
            name: "Limpeza Residencial",
            desc: "Limpeza completa de casas e apartamentos com produtos seguros e equipa experiente.",
          },
          office: {
            name: "Limpeza de Escritórios",
            desc: "Ambientes de trabalho impecáveis, desinfeção de superfícies e manutenção regular.",
          },
          deep: {
            name: "Limpeza Profunda",
            desc: "Higienização intensiva de cozinhas, casas de banho, pavimentos e zonas de difícil acesso.",
          },
          disinfestation: {
            name: "Desinfestação",
            desc: "Eliminação de baratas, formigas, traças e outros insetos com métodos certificados.",
          },
          deratization: {
            name: "Desratização",
            desc: "Controlo e erradicação de roedores com iscas seguras e monitorização contínua.",
          },
          mosquito: {
            name: "Controlo de Mosquitos",
            desc: "Tratamento de áreas exteriores e interiores para reduzir mosquitos e outros vetores.",
          },
          sanitization: {
            name: "Sanitização",
            desc: "Desinfeção de ambientes, equipamentos e superfícies de contacto frequente.",
          },
          outdoor: {
            name: "Limpeza de Áreas Exteriores",
            desc: "Pátios, jardins, fachadas, estacionamentos e espaços comuns de condomínios.",
          },
        },
      },
    },
    en: {
      meta: {
        description:
          "IVANAPAM Solutions — Professional cleaning, pest control and sanitization in Angola. Book your service today.",
        ogDescription:
          "Professional cleaning and pest control in Angola. Book your service online.",
      },
      nav: {
        aria: "Main navigation",
        home: "Home",
        services: "Services",
        booking: "Bookings",
        partners: "Partners",
        about: "About Us",
        locations: "Locations",
        gallery: "Gallery",
        contact: "Contact",
        bookCta: "Book Now",
        openMenu: "Open menu",
      },
      lang: {
        aria: "Language",
      },
      hero: {
        bannerAlt: "IVANAPAM Solutions — Interior pest control and professional cleaning",
        tagline: "Professional cleaning and pest control in Luanda and across Angola",
        badge: "Luanda · All Angola",
        taglineMain: "Professional cleaning and pest control",
        taglineSub: "Trusted hygiene, wherever you are",
        ctaBook: "Book a Service",
        ctaWhatsapp: "WhatsApp",
        scroll: "Book a service",
      },
      services: {
        label: "What we do",
        title: "Our services",
        intro:
          "Complete hygiene, cleaning and pest control solutions for homes, businesses and industry.",
        book: "Book now",
        items: {
          residential: {
            name: "Residential Cleaning",
            desc: "Full home and apartment cleaning with safe products and an experienced team.",
          },
          office: {
            name: "Office Cleaning",
            desc: "Spotless workspaces, surface disinfection and regular maintenance.",
          },
          deep: {
            name: "Deep Cleaning",
            desc: "Intensive sanitization of kitchens, bathrooms, floors and hard-to-reach areas.",
          },
          disinfestation: {
            name: "Pest Control",
            desc: "Elimination of cockroaches, ants, moths and other insects using certified methods.",
          },
          deratization: {
            name: "Rodent Control",
            desc: "Rodent control and eradication with secure bait stations and ongoing monitoring.",
          },
          mosquito: {
            name: "Mosquito Control",
            desc: "Treatment of indoor and outdoor areas to reduce mosquitoes and other vectors.",
          },
          sanitization: {
            name: "Sanitization",
            desc: "Disinfection of environments, equipment and frequently touched surfaces.",
          },
          outdoor: {
            name: "Outdoor Area Cleaning",
            desc: "Patios, gardens, façades, parking lots and shared condominium spaces.",
          },
        },
      },
      booking: {
        label: "Online bookings",
        title: "Schedule your service",
        intro: "Select services, fill in your details and send the request directly on WhatsApp.",
        search: "Search services",
        searchPlaceholder: "Search cleaning, pest control...",
        tabsAria: "Service categories",
        empty: "No services found.",
        panelAria: "Your booking",
        panelTitle: "Your booking",
        close: "Close",
        panelEmpty: "Select one or more services to book.",
        name: "Full name",
        namePh: "Your name",
        phone: "Phone / WhatsApp",
        phonePh: "9XX XXX XXX",
        address: "Address / Service location",
        addressPh: "Neighbourhood, street, landmark...",
        date: "Preferred date",
        time: "Preferred time",
        note: "Notes (optional)",
        notePh: "Additional details about the service...",
        whatsapp: "Send booking on WhatsApp",
        whatsappSub: "Free · Fast confirmation by our team",
        clear: "Clear all",
        callUs: "Or call us for more information:",
        remove: "Remove {name}",
        waHeader: "🧹 *NEW BOOKING — IVANAPAM Solutions*",
        waFooter: "Sent via www.ivanapam.com",
        step1: "Services",
        step2: "Details",
        step3: "Confirm",
        trust1: "✓ Fast WhatsApp response",
        trust2: "✓ Certified team",
        trust3: "✓ Free quote",
        property: "Property type",
        propertyPh: "Select...",
        propertyRes: "Residential",
        propertyCom: "Office / Business",
        propertyInd: "Industrial / Warehouse",
        propertyOther: "Other",
        timeSlots: "Preferred period",
        morning: "Morning",
        afternoon: "Afternoon",
        evening: "Evening",
        phoneHint: "9 digits starting with 9 (e.g. 925 484 438). +244 is optional.",
        confirmHint: "Review your details and send — our team confirms on WhatsApp.",
        openPanel: "View booking",
        stepsAria: "Booking progress",
        summaryCount: "{count} service(s): {names}",
        formError: "Please fill in all required fields correctly.",
      },
      partners: {
        label: "Trust",
        title: "Our partners",
        intro: "Leading Luanda businesses that choose IVANAPAM to keep their spaces clean, hygienic and pest-free.",
        marqueeAria: "Infinite partner logos carousel",
        gridAria: "Partner logos grid",
        openLogo: "View {name} in full size",
        viewDetail: "Tap to enlarge",
        items: {
          gelsadas: {
            name: "Gelsadas",
            subtitle: "Cleaning and Pest Control",
            tag: "Professional hygiene",
            location: "Luanda",
            desc: "Angolan partner for deep cleaning, pest control and sanitization of shops, offices and production centres.",
          },
          global: {
            name: "Global Services Corporation",
            subtitle: "Corporate services",
            tag: "Corporate",
            location: "Ingombota, Luanda",
            desc: "Leading Angolan group in insurance mediation, training, consulting and corporate events.",
          },
          chimbungos: {
            name: "Chimbungos Grill",
            subtitle: "Restaurant",
            tag: "Dining",
            location: "Kilamba, Belas",
            desc: "A go-to spot for grilled dishes, salads and desserts in Kilamba — welcoming atmosphere and quality food.",
          },
        },
      },
      about: {
        imgAlt: "IVANAPAM team at work",
        label: "About Us",
        title: "Excellence in cleaning and pest control",
        lead: "Professional cleaning and pest control across Angola — visible results from day one.",
        p1: "<strong>IVANAPAM Solutions</strong> serves homes, businesses, restaurants and industry in Luanda and nationwide. Trained crews, certified products and methods that protect your health and your space.",
        highlightsAria: "IVANAPAM highlights",
        h1: "Deep cleaning, pest control and interior sanitization",
        h2: "Qualified team and professional equipment on site",
        h3: "Coverage in Luanda, Cabo Ledo, Sangano and other provinces",
        h4: "Free quote and fast confirmation via WhatsApp",
        p2: "Our pledge: punctuality, safety and hygienic, pest-free environments.",
        badge1: "🇦🇴 Angolan company",
        badge2: "⚡ Reply within 24h",
        badge3: "🛡️ No-obligation quote",
        liveTag: "Team on site",
        stat1v: "24h",
        stat1l: "Fast response",
        stat2v: "100%",
        stat2l: "Angola",
        stat3v: "PPE",
        stat3l: "Certified gear",
        cta: "Book a service now",
      },
      locations: {
        label: "Luanda",
        title: "Places where we have worked",
        intro:
          "Resorts, businesses, restaurants and homes in Luanda province and surrounding areas — IVANAPAM team on site.",
        note: "We also serve other areas of Angola. Request a free quote.",
        areas: {
          luanda: "Luanda",
          caboLedo: "Cabo Ledo",
          sangano: "Sangano",
        },
        items: {
          qpoint: {
            name: "Q-Point Resort Cabo Ledo",
            desc: "Cleaning of common areas, rooms and outdoor spaces at the resort.",
            service: "Cleaning · Pest control",
          },
          sangano: {
            name: "Sangano Resort",
            desc: "Pest control and sanitization at tourism facilities.",
            service: "Pest control",
          },
          chimbungos: {
            name: "Chimbungos",
            desc: "Hygiene for dining and event spaces in Luanda.",
            service: "Deep cleaning",
          },
          gelsadas: {
            name: "Gelsadas",
            desc: "Sanitization of stores and production centres.",
            service: "Sanitization",
          },
          global: {
            name: "Global Services Corporation",
            desc: "Regular cleaning at corporate facilities.",
            service: "Corporate cleaning",
          },
          cuca: {
            name: "CUCA",
            desc: "Sanitization of operational and industrial areas.",
            service: "Industrial hygiene",
          },
          residencial: {
            name: "Homes in Luanda",
            desc: "Pest control and cleaning for houses and apartments.",
            service: "Residential pest control",
          },
          escritorios: {
            name: "Offices and businesses",
            desc: "Cleaning of workstations and commercial spaces.",
            service: "Office cleaning",
          },
          edificios: {
            name: "Buildings and condominiums",
            desc: "Cleaning of stairs, corridors and common areas.",
            service: "Building cleaning",
          },
          exterior: {
            name: "Outdoor areas",
            desc: "Cleaning of patios, gardens and exterior zones.",
            service: "Outdoor cleaning",
          },
        },
      },
      gallery: {
        aria: "IVANAPAM gallery",
        label: "Gallery",
        title: "Our work in pictures",
        intro: "Tap a photo to view full size. Each image shows a real IVANAPAM service.",
        mosaicAria: "Gallery photo grid",
        carouselAria: "Gallery carousel",
        dotsAria: "Browse photos",
        zoom: "View photo",
        viewLarge: "View {name} full size",
        photoOf: "Photo {n} of {total}",
        caption: "{name} — {site}",
        photos: {
          fumigacaoTermica: "Thermal fumigation — Luanda",
          desinfestacaoResidencial: "Residential pest control — Luanda",
          equipaSala: "IVANAPAM team in living room — Luanda",
          equipaExterior: "Pest control at Sangano Resort",
          limpezaPatio: "Patio cleaning — Luanda",
          cozinhaProfissional: "CUCA industrial kitchen — Luanda",
          resortQpoint: "Cleaning at Q-Point Resort Cabo Ledo",
          escadasEquipa: "Industrial kitchen cleaning — IVANAPAM team",
          servicosDesinfestacao: "Certified pest control operation",
          limpezaEscritorios: "Office and workstation cleaning",
          ppeDesinfeccao: "Disinfection with personal protective equipment",
          aniversario: "IVANAPAM team celebration",
          parceiros: "Partnerships with leading companies",
          parceiroChimbungos: "Partnership with Chimbungos",
          parceiroGelsadas: "Partnership with Gelsadas",
          parceiroGlobal: "Partnership with Global Alliance",
        },
      },
      contact: {
        label: "Get in touch",
        title: "Contact",
        phones: "Phones / WhatsApp",
        email: "Email",
        web: "Website",
        instagram: "Instagram",
        hours: "Hours",
        hoursText: "Mon–Sat: 8am–6pm · Sunday: by appointment",
        name: "Name",
        emailField: "Email",
        subject: "Subject",
        message: "Message",
        submit: "Send Message",
        namePh: "Your name",
        emailPh: "email@example.com",
        subjectPh: "How can we help?",
        messagePh: "Your message...",
      },
      footer: {
        contact: "Contact & phone numbers",
        instagram: "Instagram @ivanapam_solutions",
        rights: "© 2026 IVANAPAM Solutions — Angola. All rights reserved.",
      },
      mobile: {
        aria: "Quick access",
        booking: "Booking",
        whatsapp: "WhatsApp",
      },
      fab: {
        whatsapp: "WhatsApp",
      },
      forms: {
        error: "Please fill in all fields correctly.",
        contactOk: "Message sent successfully! We will contact you soon.",
        bookingOk: "Booking ready! Confirm sending on WhatsApp.",
      },
      toast: {
        added: "{name} added to booking",
        removed: "{name} removed",
        cleared: "Booking cleared",
      },
      lightbox: {
        aria: "View enlarged image",
        close: "Close",
        prev: "Previous photo",
        next: "Next photo",
      },
      menu: {
        add: "+ Add",
        remove: "− Remove",
        addAria: "Add {name} to booking",
        removeAria: "Remove {name} from booking",
        cat: {
          all: "All",
          limpeza: "Cleaning",
          desinfestacao: "Pest Control",
          sanitizacao: "Sanitization",
        },
        badge: {
          popular: "Most booked",
          recommended: "Recommended",
          premium: "Premium",
          urgent: "Urgent",
        },
        items: {
          residential: {
            name: "Residential Cleaning",
            desc: "Full home and apartment cleaning with safe products and an experienced team.",
          },
          office: {
            name: "Office Cleaning",
            desc: "Spotless workspaces, surface disinfection and regular maintenance.",
          },
          deep: {
            name: "Deep Cleaning",
            desc: "Intensive sanitization of kitchens, bathrooms, floors and hard-to-reach areas.",
          },
          disinfestation: {
            name: "Pest Control",
            desc: "Elimination of cockroaches, ants, moths and other insects using certified methods.",
          },
          deratization: {
            name: "Rodent Control",
            desc: "Rodent control and eradication with secure bait stations and ongoing monitoring.",
          },
          mosquito: {
            name: "Mosquito Control",
            desc: "Treatment of indoor and outdoor areas to reduce mosquitoes and other vectors.",
          },
          sanitization: {
            name: "Sanitization",
            desc: "Disinfection of environments, equipment and frequently touched surfaces.",
          },
          outdoor: {
            name: "Outdoor Area Cleaning",
            desc: "Patios, gardens, façades, parking lots and shared condominium spaces.",
          },
        },
      },
    },
    es: {
      meta: {
        description:
          "IVANAPAM Solutions — Limpieza profesional, desinsectación y sanitización en Angola. Reserva tu servicio hoy.",
        ogDescription:
          "Limpieza profesional y desinsectación en Angola. Reserva tu servicio online.",
      },
      nav: {
        aria: "Navegación principal",
        home: "Inicio",
        services: "Servicios",
        booking: "Reservas",
        partners: "Socios",
        about: "Quiénes Somos",
        locations: "Locales",
        gallery: "Galería",
        contact: "Contacto",
        bookCta: "Reservar",
        openMenu: "Abrir menú",
      },
      lang: {
        aria: "Idioma",
      },
      hero: {
        bannerAlt: "IVANAPAM Solutions — Servicios de desinsectación y limpieza de interiores",
        tagline: "Limpieza profesional y desinsectación en Luanda y todo Angola",
        badge: "Luanda · Todo Angola",
        taglineMain: "Limpieza profesional y desinsectación",
        taglineSub: "Higiene de confianza, donde estés",
        ctaBook: "Reservar Servicio",
        ctaWhatsapp: "WhatsApp",
        scroll: "Reservar servicio",
      },
      services: {
        label: "Qué hacemos",
        title: "Nuestros servicios",
        intro:
          "Soluciones completas de higiene, limpieza y control de plagas para hogares, empresas e industria.",
        book: "Reservar",
        items: {
          residential: {
            name: "Limpieza Residencial",
            desc: "Limpieza completa de casas y apartamentos con productos seguros y equipo experimentado.",
          },
          office: {
            name: "Limpieza de Oficinas",
            desc: "Espacios de trabajo impecables, desinfección de superficies y mantenimiento regular.",
          },
          deep: {
            name: "Limpieza Profunda",
            desc: "Higienización intensiva de cocinas, baños, suelos y zonas de difícil acceso.",
          },
          disinfestation: {
            name: "Desinsectación",
            desc: "Eliminación de cucarachas, hormigas, polillas y otros insectos con métodos certificados.",
          },
          deratization: {
            name: "Desratización",
            desc: "Control y erradicación de roedores con cebos seguros y monitorización continua.",
          },
          mosquito: {
            name: "Control de Mosquitos",
            desc: "Tratamiento de áreas exteriores e interiores para reducir mosquitos y otros vectores.",
          },
          sanitization: {
            name: "Sanitización",
            desc: "Desinfección de ambientes, equipos y superficies de contacto frecuente.",
          },
          outdoor: {
            name: "Limpieza de Áreas Exteriores",
            desc: "Patios, jardines, fachadas, aparcamientos y espacios comunes de condominios.",
          },
        },
      },
      booking: {
        label: "Reservas online",
        title: "Programa tu servicio",
        intro:
          "Selecciona los servicios, completa tus datos y envía la solicitud directamente por WhatsApp.",
        search: "Buscar servicios",
        searchPlaceholder: "Buscar limpieza, desinsectación...",
        tabsAria: "Categorías de servicios",
        empty: "Ningún servicio encontrado.",
        panelAria: "Tu reserva",
        panelTitle: "Tu reserva",
        close: "Cerrar",
        panelEmpty: "Selecciona uno o más servicios para reservar.",
        name: "Nombre completo",
        namePh: "Tu nombre",
        phone: "Teléfono / WhatsApp",
        phonePh: "9XX XXX XXX",
        address: "Dirección / Lugar del servicio",
        addressPh: "Barrio, calle, referencia...",
        date: "Fecha preferida",
        time: "Hora preferida",
        note: "Observaciones (opcional)",
        notePh: "Detalles adicionales sobre el servicio...",
        whatsapp: "Enviar reserva por WhatsApp",
        whatsappSub: "Gratis · Confirmación rápida por el equipo",
        clear: "Limpiar todo",
        callUs: "O llámanos para más información:",
        remove: "Eliminar {name}",
        waHeader: "🧹 *NUEVA RESERVA — IVANAPAM Solutions*",
        waFooter: "Enviado vía www.ivanapam.com",
        step1: "Servicios",
        step2: "Datos",
        step3: "Confirmar",
        trust1: "✓ Respuesta rápida por WhatsApp",
        trust2: "✓ Equipo certificado",
        trust3: "✓ Presupuesto sin compromiso",
        property: "Tipo de local",
        propertyPh: "Selecciona...",
        propertyRes: "Vivienda",
        propertyCom: "Empresa / Oficina",
        propertyInd: "Industrial / Almacén",
        propertyOther: "Otro",
        timeSlots: "Período preferido",
        morning: "Mañana",
        afternoon: "Tarde",
        evening: "Noche",
        phoneHint: "9 dígitos empezando por 9 (ej.: 925 484 438). +244 es opcional.",
        confirmHint: "Revisa los datos y envía — nuestro equipo confirma por WhatsApp.",
        openPanel: "Ver reserva",
        stepsAria: "Progreso de la reserva",
        summaryCount: "{count} servicio(s): {names}",
        formError: "Completa todos los campos obligatorios correctamente.",
      },
      partners: {
        label: "Confianza",
        title: "Nuestros socios",
        intro: "Empresas de referencia en Luanda que eligen IVANAPAM para mantener sus espacios limpios, higienizados y libres de plagas.",
        marqueeAria: "Carrusel infinito de logotipos de socios",
        gridAria: "Cuadrícula de logotipos de socios",
        openLogo: "Ver {name} en grande",
        viewDetail: "Toca para ampliar",
        items: {
          gelsadas: {
            name: "Gelsadas",
            subtitle: "Limpieza y Desinsectación",
            tag: "Higiene profesional",
            location: "Luanda",
            desc: "Socio angoleño en limpieza profunda, desinsectación y sanitización de tiendas, oficinas y centros de producción.",
          },
          global: {
            name: "Global Services Corporation",
            subtitle: "Servicios corporativos",
            tag: "Corporativo",
            location: "Ingombota, Luanda",
            desc: "Grupo angoleño de referencia en mediación de seguros, formación, consultoría y eventos empresariales.",
          },
          chimbungos: {
            name: "Chimbungos Grill",
            subtitle: "Restaurante",
            tag: "Restauración",
            location: "Kilamba, Belas",
            desc: "Referencia en parrilla, ensaladas y postres en la centralidad de Kilamba — ambiente acogedor y cocina de calidad.",
          },
        },
      },
      about: {
        imgAlt: "Equipo IVANAPAM en acción",
        label: "Quiénes Somos",
        title: "Excelencia en limpieza y desinsectación",
        lead: "Limpieza profesional y control de plagas en todo Angola — resultados visibles desde el primer día.",
        p1: "<strong>IVANAPAM Solutions</strong> actúa en viviendas, empresas, restaurantes e industria en Luanda y en todo el territorio nacional. Equipo formado, productos certificados y métodos que protegen su salud y su espacio.",
        highlightsAria: "Destacados IVANAPAM",
        h1: "Limpieza profunda, desinsectación y sanitización de interiores",
        h2: "Equipo cualificado y equipamiento profesional en el terreno",
        h3: "Atención en Luanda, Cabo Ledo, Sangano y otras provincias",
        h4: "Presupuesto gratuito y confirmación rápida por WhatsApp",
        p2: "Compromiso: puntualidad, seguridad y entornos higienizados sin plagas.",
        badge1: "🇦🇴 Empresa angoleña",
        badge2: "⚡ Respuesta en 24h",
        badge3: "🛡️ Presupuesto sin compromiso",
        liveTag: "Equipo en campo",
        stat1v: "24h",
        stat1l: "Respuesta rápida",
        stat2v: "100%",
        stat2l: "Angola",
        stat3v: "PPE",
        stat3l: "Equip. certificado",
        cta: "Reservar servicio ahora",
      },
      locations: {
        label: "Luanda",
        title: "Locales donde hemos trabajado",
        intro:
          "Resorts, empresas, restaurantes y viviendas en la provincia de Luanda y alrededores — equipo IVANAPAM en el terreno.",
        note: "También atendemos otras zonas de Angola. Pide presupuesto sin compromiso.",
        areas: {
          luanda: "Luanda",
          caboLedo: "Cabo Ledo",
          sangano: "Sangano",
        },
        items: {
          qpoint: {
            name: "Q-Point Resort Cabo Ledo",
            desc: "Limpieza de áreas comunes, habitaciones y espacios exteriores del resort.",
            service: "Limpieza · Desinsectación",
          },
          sangano: {
            name: "Resort Sangano",
            desc: "Desinsectación e higienización en instalaciones turísticas.",
            service: "Desinsectación",
          },
          chimbungos: {
            name: "Chimbungos",
            desc: "Higienización de espacios de restauración y eventos en Luanda.",
            service: "Limpieza profunda",
          },
          gelsadas: {
            name: "Gelsadas",
            desc: "Sanitización de tiendas y centros de producción.",
            service: "Sanitización",
          },
          global: {
            name: "Global Services Corporation",
            desc: "Limpieza regular en instalaciones corporativas.",
            service: "Limpieza corporativa",
          },
          cuca: {
            name: "CUCA",
            desc: "Higienización de áreas operativas e industriales.",
            service: "Higiene industrial",
          },
          residencial: {
            name: "Viviendas en Luanda",
            desc: "Desinsectación y limpieza en casas y apartamentos.",
            service: "Desinsectación residencial",
          },
          escritorios: {
            name: "Oficinas y empresas",
            desc: "Limpieza de puestos de trabajo y salas comerciales.",
            service: "Limpieza de oficinas",
          },
          edificios: {
            name: "Edificios y condominios",
            desc: "Limpieza de escaleras, pasillos y áreas comunes.",
            service: "Limpieza de edificios",
          },
          exterior: {
            name: "Áreas exteriores",
            desc: "Limpieza de patios, jardines y zonas exteriores.",
            service: "Limpieza exterior",
          },
        },
      },
      gallery: {
        aria: "Galería IVANAPAM",
        label: "Galería",
        title: "Nuestro trabajo en imágenes",
        intro: "Toca una foto para verla en grande. Cada imagen muestra un servicio real del equipo IVANAPAM.",
        mosaicAria: "Cuadrícula de fotos de la galería",
        carouselAria: "Carrusel de la galería",
        dotsAria: "Navegar fotos",
        zoom: "Ver foto",
        viewLarge: "Ver {name} en grande",
        photoOf: "Foto {n} de {total}",
        caption: "{name} — {site}",
        photos: {
          fumigacaoTermica: "Fumigación térmica — Luanda",
          desinfestacaoResidencial: "Desinsectación residencial — Luanda",
          equipaSala: "Equipo IVANAPAM en sala — Luanda",
          equipaExterior: "Desinsectación en Resort Sangano",
          limpezaPatio: "Limpieza de patio — Luanda",
          cozinhaProfissional: "Cocina industrial CUCA — Luanda",
          resortQpoint: "Limpieza en Q-Point Resort Cabo Ledo",
          escadasEquipa: "Limpieza de cocina industrial — equipo IVANAPAM",
          servicosDesinfestacao: "Operación de desinsectación certificada",
          limpezaEscritorios: "Limpieza de oficinas y puestos de trabajo",
          ppeDesinfeccao: "Desinfección con equipo de protección individual",
          aniversario: "Celebración del equipo IVANAPAM",
          parceiros: "Alianzas con empresas de referencia",
          parceiroChimbungos: "Alianza con Chimbungos",
          parceiroGelsadas: "Alianza con Gelsadas",
          parceiroGlobal: "Alianza con Global Alliance",
        },
      },
      contact: {
        label: "Hablemos",
        title: "Contacto",
        phones: "Teléfonos / WhatsApp",
        email: "Email",
        web: "Sitio web",
        instagram: "Instagram",
        hours: "Horario",
        hoursText: "Lun–Sáb: 8h–18h · Domingo: con cita previa",
        name: "Nombre",
        emailField: "Email",
        subject: "Asunto",
        message: "Mensaje",
        submit: "Enviar Mensaje",
        namePh: "Tu nombre",
        emailPh: "email@ejemplo.com",
        subjectPh: "¿Cómo podemos ayudar?",
        messagePh: "Tu mensaje...",
      },
      footer: {
        contact: "Contacto y teléfonos",
        instagram: "Instagram @ivanapam_solutions",
        rights: "© 2026 IVANAPAM Solutions — Angola. Todos los derechos reservados.",
      },
      mobile: {
        aria: "Acceso rápido",
        booking: "Reserva",
        whatsapp: "WhatsApp",
      },
      fab: {
        whatsapp: "WhatsApp",
      },
      forms: {
        error: "Por favor, rellena todos los campos correctamente.",
        contactOk: "¡Mensaje enviado con éxito! Te contactaremos pronto.",
        bookingOk: "¡Reserva preparada! Confirma el envío en WhatsApp.",
      },
      toast: {
        added: "{name} añadido a la reserva",
        removed: "{name} eliminado",
        cleared: "Reserva vaciada",
      },
      lightbox: {
        aria: "Ver imagen ampliada",
        close: "Cerrar",
        prev: "Foto anterior",
        next: "Foto siguiente",
      },
      menu: {
        add: "+ Añadir",
        remove: "− Quitar",
        addAria: "Añadir {name} a la reserva",
        removeAria: "Quitar {name} de la reserva",
        cat: {
          all: "Todos",
          limpeza: "Limpieza",
          desinfestacao: "Desinsectación",
          sanitizacao: "Sanitización",
        },
        badge: {
          popular: "Más reservado",
          recommended: "Recomendado",
          premium: "Premium",
          urgent: "Urgente",
        },
        items: {
          residential: {
            name: "Limpieza Residencial",
            desc: "Limpieza completa de casas y apartamentos con productos seguros y equipo experimentado.",
          },
          office: {
            name: "Limpieza de Oficinas",
            desc: "Espacios de trabajo impecables, desinfección de superficies y mantenimiento regular.",
          },
          deep: {
            name: "Limpieza Profunda",
            desc: "Higienización intensiva de cocinas, baños, suelos y zonas de difícil acceso.",
          },
          disinfestation: {
            name: "Desinsectación",
            desc: "Eliminación de cucarachas, hormigas, polillas y otros insectos con métodos certificados.",
          },
          deratization: {
            name: "Desratización",
            desc: "Control y erradicación de roedores con cebos seguros y monitorización continua.",
          },
          mosquito: {
            name: "Control de Mosquitos",
            desc: "Tratamiento de áreas exteriores e interiores para reducir mosquitos y otros vectores.",
          },
          sanitization: {
            name: "Sanitización",
            desc: "Desinfección de ambientes, equipos y superficies de contacto frecuente.",
          },
          outdoor: {
            name: "Limpieza de Áreas Exteriores",
            desc: "Patios, jardines, fachadas, aparcamientos y espacios comunes de condominios.",
          },
        },
      },
    },
    fr: {
      meta: {
        description:
          "IVANAPAM Solutions — Nettoyage professionnel, désinsectisation et sanitisation en Angola. Réservez votre service dès maintenant.",
        ogDescription:
          "Nettoyage professionnel et désinsectisation en Angola. Réservez votre service en ligne.",
      },
      nav: {
        aria: "Navigation principale",
        home: "Accueil",
        services: "Services",
        booking: "Réservations",
        partners: "Partenaires",
        about: "À propos",
        locations: "Lieux",
        gallery: "Galerie",
        contact: "Contact",
        bookCta: "Réserver",
        openMenu: "Ouvrir le menu",
      },
      lang: {
        aria: "Langue",
      },
      hero: {
        bannerAlt: "IVANAPAM Solutions — Désinsectisation et nettoyage professionnel d'intérieurs",
        tagline: "Nettoyage professionnel et désinsectisation à Luanda et dans tout l'Angola",
        badge: "Luanda · Tout l'Angola",
        taglineMain: "Nettoyage professionnel et désinsectisation",
        taglineSub: "Hygiène de confiance, où que vous soyez",
        ctaBook: "Réserver un Service",
        ctaWhatsapp: "WhatsApp",
        scroll: "Réserver un service",
      },
      services: {
        label: "Ce que nous faisons",
        title: "Nos services",
        intro:
          "Solutions complètes d'hygiène, de nettoyage et de lutte antiparasitaire pour les foyers, les entreprises et l'industrie.",
        book: "Réserver",
        items: {
          residential: {
            name: "Nettoyage Résidentiel",
            desc: "Nettoyage complet de maisons et appartements avec des produits sûrs et une équipe expérimentée.",
          },
          office: {
            name: "Nettoyage de Bureaux",
            desc: "Espaces de travail impeccables, désinfection des surfaces et entretien régulier.",
          },
          deep: {
            name: "Nettoyage en Profondeur",
            desc: "Hygiénisation intensive des cuisines, salles de bain, sols et zones difficiles d'accès.",
          },
          disinfestation: {
            name: "Désinsectisation",
            desc: "Élimination des cafards, fourmis, mites et autres insectes par des méthodes certifiées.",
          },
          deratization: {
            name: "Dératisation",
            desc: "Contrôle et éradication des rongeurs avec des appâts sécurisés et un suivi continu.",
          },
          mosquito: {
            name: "Lutte Anti-Moustiques",
            desc: "Traitement des espaces intérieurs et extérieurs pour réduire moustiques et autres vecteurs.",
          },
          sanitization: {
            name: "Sanitisation",
            desc: "Désinfection des environnements, équipements et surfaces fréquemment touchées.",
          },
          outdoor: {
            name: "Nettoyage d'Espaces Extérieurs",
            desc: "Patios, jardins, façades, parkings et espaces communs de copropriétés.",
          },
        },
      },
      booking: {
        label: "Réservations en ligne",
        title: "Planifiez votre service",
        intro:
          "Sélectionnez les services, remplissez vos informations et envoyez la demande directement sur WhatsApp.",
        search: "Rechercher des services",
        searchPlaceholder: "Rechercher nettoyage, désinsectisation...",
        tabsAria: "Catégories de services",
        empty: "Aucun service trouvé.",
        panelAria: "Votre réservation",
        panelTitle: "Votre réservation",
        close: "Fermer",
        panelEmpty: "Sélectionnez un ou plusieurs services à réserver.",
        name: "Nom complet",
        namePh: "Votre nom",
        phone: "Téléphone / WhatsApp",
        phonePh: "9XX XXX XXX",
        address: "Adresse / Lieu du service",
        addressPh: "Quartier, rue, point de repère...",
        date: "Date souhaitée",
        time: "Heure souhaitée",
        note: "Remarques (optionnel)",
        notePh: "Détails supplémentaires sur le service...",
        whatsapp: "Envoyer la réservation sur WhatsApp",
        whatsappSub: "Gratuit · Confirmation rapide par l'équipe",
        clear: "Tout effacer",
        callUs: "Ou appelez-nous pour plus d'informations :",
        remove: "Supprimer {name}",
        waHeader: "🧹 *NOUVELLE RÉSERVATION — IVANAPAM Solutions*",
        waFooter: "Envoyé via www.ivanapam.com",
        step1: "Services",
        step2: "Informations",
        step3: "Confirmer",
        trust1: "✓ Réponse rapide sur WhatsApp",
        trust2: "✓ Équipe certifiée",
        trust3: "✓ Devis sans engagement",
        property: "Type de local",
        propertyPh: "Sélectionnez...",
        propertyRes: "Résidence",
        propertyCom: "Entreprise / Bureau",
        propertyInd: "Industriel / Entrepôt",
        propertyOther: "Autre",
        timeSlots: "Période souhaitée",
        morning: "Matin",
        afternoon: "Après-midi",
        evening: "Soir",
        phoneHint: "9 chiffres commençant par 9 (ex. : 925 484 438). +244 est optionnel.",
        confirmHint: "Vérifiez vos informations et envoyez — notre équipe confirme sur WhatsApp.",
        openPanel: "Voir la réservation",
        stepsAria: "Progression de la réservation",
        summaryCount: "{count} service(s) : {names}",
        formError: "Veuillez remplir correctement tous les champs obligatoires.",
      },
      partners: {
        label: "Confiance",
        title: "Nos partenaires",
        intro: "Entreprises de référence à Luanda qui choisissent IVANAPAM pour des espaces propres, hygiéniques et sans nuisibles.",
        marqueeAria: "Carrousel infini des logos partenaires",
        gridAria: "Grille des logos partenaires",
        openLogo: "Voir {name} en grand",
        viewDetail: "Appuyez pour agrandir",
        items: {
          gelsadas: {
            name: "Gelsadas",
            subtitle: "Nettoyage et Désinsectisation",
            tag: "Hygiène professionnelle",
            location: "Luanda",
            desc: "Partenaire angolais en nettoyage en profondeur, désinsectisation et sanitisation de commerces, bureaux et centres de production.",
          },
          global: {
            name: "Global Services Corporation",
            subtitle: "Services corporatifs",
            tag: "Corporate",
            location: "Ingombota, Luanda",
            desc: "Groupe angolais de référence en médiation d'assurances, formation, conseil et événements d'entreprise.",
          },
          chimbungos: {
            name: "Chimbungos Grill",
            subtitle: "Restaurant",
            tag: "Restauration",
            location: "Kilamba, Belas",
            desc: "Adresse incontournable pour grillades, salades et desserts à Kilamba — ambiance conviviale et cuisine de qualité.",
          },
        },
      },
      about: {
        imgAlt: "Équipe IVANAPAM en action",
        label: "À propos",
        title: "Excellence en nettoyage et désinsectisation",
        lead: "Nettoyage professionnel et lutte antiparasitaire dans tout l'Angola — des résultats visibles dès le premier jour.",
        p1: "<strong>IVANAPAM Solutions</strong> intervient dans les résidences, entreprises, restaurants et sites industriels à Luanda et sur tout le territoire national. Équipe formée, produits certifiés et méthodes qui protègent votre santé et vos locaux.",
        highlightsAria: "Points forts IVANAPAM",
        h1: "Nettoyage en profondeur, désinsectisation et sanitisation d'intérieurs",
        h2: "Équipe qualifiée et matériel professionnel sur le terrain",
        h3: "Intervention à Luanda, Cabo Ledo, Sangano et autres provinces",
        h4: "Devis gratuit et confirmation rapide par WhatsApp",
        p2: "Engagement : ponctualité, sécurité et espaces hygiéniques sans nuisibles.",
        badge1: "🇦🇴 Entreprise angolaise",
        badge2: "⚡ Réponse sous 24h",
        badge3: "🛡️ Devis sans engagement",
        liveTag: "Équipe sur le terrain",
        stat1v: "24h",
        stat1l: "Réponse rapide",
        stat2v: "100%",
        stat2l: "Angola",
        stat3v: "EPI",
        stat3l: "Équip. certifié",
        cta: "Réserver un service",
      },
      locations: {
        label: "Luanda",
        title: "Lieux où nous avons travaillé",
        intro:
          "Resorts, entreprises, restaurants et résidences dans la province de Luanda et environs — équipe IVANAPAM sur le terrain.",
        note: "Nous intervenons aussi dans d'autres régions d'Angola. Demandez un devis gratuit.",
        areas: {
          luanda: "Luanda",
          caboLedo: "Cabo Ledo",
          sangano: "Sangano",
        },
        items: {
          qpoint: {
            name: "Q-Point Resort Cabo Ledo",
            desc: "Nettoyage des espaces communs, chambres et zones extérieures du resort.",
            service: "Nettoyage · Désinsectisation",
          },
          sangano: {
            name: "Resort Sangano",
            desc: "Désinsectisation et hygiénisation dans des installations touristiques.",
            service: "Désinsectisation",
          },
          chimbungos: {
            name: "Chimbungos",
            desc: "Hygiénisation d'espaces de restauration et d'événements à Luanda.",
            service: "Nettoyage en profondeur",
          },
          gelsadas: {
            name: "Gelsadas",
            desc: "Sanitisation de magasins et centres de production.",
            service: "Sanitisation",
          },
          global: {
            name: "Global Services Corporation",
            desc: "Nettoyage régulier dans des installations corporatives.",
            service: "Nettoyage corporatif",
          },
          cuca: {
            name: "CUCA",
            desc: "Hygiénisation de zones opérationnelles et industrielles.",
            service: "Hygiène industrielle",
          },
          residencial: {
            name: "Résidences à Luanda",
            desc: "Désinsectisation et nettoyage de maisons et appartements.",
            service: "Désinsectisation résidentielle",
          },
          escritorios: {
            name: "Bureaux et entreprises",
            desc: "Nettoyage de postes de travail et espaces commerciaux.",
            service: "Nettoyage de bureaux",
          },
          edificios: {
            name: "Immeubles et condominiums",
            desc: "Nettoyage d'escaliers, couloirs et espaces communs.",
            service: "Nettoyage d'immeubles",
          },
          exterior: {
            name: "Espaces extérieurs",
            desc: "Nettoyage de patios, jardins et zones extérieures.",
            service: "Nettoyage extérieur",
          },
        },
      },
      gallery: {
        aria: "Galerie IVANAPAM",
        label: "Galerie",
        title: "Notre travail en images",
        intro: "Touchez une photo pour la voir en grand. Chaque image montre un service réel de l'équipe IVANAPAM.",
        mosaicAria: "Grille de photos de la galerie",
        carouselAria: "Carrousel de la galerie",
        dotsAria: "Parcourir les photos",
        zoom: "Voir la photo",
        viewLarge: "Voir {name} en grand",
        photoOf: "Photo {n} sur {total}",
        caption: "{name} — {site}",
        photos: {
          fumigacaoTermica: "Fumigation thermique — Luanda",
          desinfestacaoResidencial: "Désinsectisation résidentielle — Luanda",
          equipaSala: "Équipe IVANAPAM en salon — Luanda",
          equipaExterior: "Désinsectisation au Resort Sangano",
          limpezaPatio: "Nettoyage de patio — Luanda",
          cozinhaProfissional: "Cuisine industrielle CUCA — Luanda",
          resortQpoint: "Nettoyage au Q-Point Resort Cabo Ledo",
          escadasEquipa: "Nettoyage de cuisine industrielle — équipe IVANAPAM",
          servicosDesinfestacao: "Opération de désinsectisation certifiée",
          limpezaEscritorios: "Nettoyage de bureaux et postes de travail",
          ppeDesinfeccao: "Désinfection avec équipement de protection individuelle",
          aniversario: "Célébration de l'équipe IVANAPAM",
          parceiros: "Partenariats avec des entreprises de référence",
          parceiroChimbungos: "Partenariat avec Chimbungos",
          parceiroGelsadas: "Partenariat avec Gelsadas",
          parceiroGlobal: "Partenariat avec Global Alliance",
        },
      },
      contact: {
        label: "Contactez-nous",
        title: "Contact",
        phones: "Téléphones / WhatsApp",
        email: "Email",
        web: "Site web",
        instagram: "Instagram",
        hours: "Horaires",
        hoursText: "Lun–Sam : 8h–18h · Dimanche : sur rendez-vous",
        name: "Nom",
        emailField: "Email",
        subject: "Sujet",
        message: "Message",
        submit: "Envoyer le Message",
        namePh: "Votre nom",
        emailPh: "email@exemple.com",
        subjectPh: "Comment pouvons-nous aider ?",
        messagePh: "Votre message...",
      },
      footer: {
        contact: "Contact et téléphones",
        instagram: "Instagram @ivanapam_solutions",
        rights: "© 2026 IVANAPAM Solutions — Angola. Tous droits réservés.",
      },
      mobile: {
        aria: "Accès rapide",
        booking: "Réservation",
        whatsapp: "WhatsApp",
      },
      fab: {
        whatsapp: "WhatsApp",
      },
      forms: {
        error: "Veuillez remplir tous les champs correctement.",
        contactOk: "Message envoyé avec succès ! Nous vous contacterons bientôt.",
        bookingOk: "Réservation prête ! Confirmez l'envoi sur WhatsApp.",
      },
      toast: {
        added: "{name} ajouté à la réservation",
        removed: "{name} retiré",
        cleared: "Réservation effacée",
      },
      lightbox: {
        aria: "Voir l'image agrandie",
        close: "Fermer",
        prev: "Photo précédente",
        next: "Photo suivante",
      },
      menu: {
        add: "+ Ajouter",
        remove: "− Retirer",
        addAria: "Ajouter {name} à la réservation",
        removeAria: "Retirer {name} de la réservation",
        cat: {
          all: "Tout",
          limpeza: "Nettoyage",
          desinfestacao: "Désinsectisation",
          sanitizacao: "Sanitisation",
        },
        badge: {
          popular: "Le plus réservé",
          recommended: "Recommandé",
          premium: "Premium",
          urgent: "Urgent",
        },
        items: {
          residential: {
            name: "Nettoyage Résidentiel",
            desc: "Nettoyage complet de maisons et appartements avec des produits sûrs et une équipe expérimentée.",
          },
          office: {
            name: "Nettoyage de Bureaux",
            desc: "Espaces de travail impeccables, désinfection des surfaces et entretien régulier.",
          },
          deep: {
            name: "Nettoyage en Profondeur",
            desc: "Hygiénisation intensive des cuisines, salles de bain, sols et zones difficiles d'accès.",
          },
          disinfestation: {
            name: "Désinsectisation",
            desc: "Élimination des cafards, fourmis, mites et autres insectes par des méthodes certifiées.",
          },
          deratization: {
            name: "Dératisation",
            desc: "Contrôle et éradication des rongeurs avec des appâts sécurisés et un suivi continu.",
          },
          mosquito: {
            name: "Lutte Anti-Moustiques",
            desc: "Traitement des espaces intérieurs et extérieurs pour réduire moustiques et autres vecteurs.",
          },
          sanitization: {
            name: "Sanitisation",
            desc: "Désinfection des environnements, équipements et surfaces fréquemment touchées.",
          },
          outdoor: {
            name: "Nettoyage d'Espaces Extérieurs",
            desc: "Patios, jardins, façades, parkings et espaces communs de copropriétés.",
          },
        },
      },
    },
  };

  let currentLang = DEFAULT_LANG;

  function detectLang() {
    const list = navigator.languages?.length
      ? navigator.languages
      : [navigator.language || DEFAULT_LANG];
    for (const raw of list) {
      const code = String(raw).toLowerCase().split("-")[0];
      if (SUPPORTED.includes(code)) return code;
    }
    return DEFAULT_LANG;
  }

  function getNested(obj, path) {
    return path.split(".").reduce((o, k) => (o && o[k] !== undefined ? o[k] : null), obj);
  }

  function t(key, vars) {
    const table = STRINGS[currentLang] || STRINGS[DEFAULT_LANG];
    let text = getNested(table, key) ?? getNested(STRINGS[DEFAULT_LANG], key) ?? key;
    if (vars) {
      Object.keys(vars).forEach((k) => {
        text = text.replace(new RegExp(`\\{${k}\\}`, "g"), vars[k]);
      });
    }
    return text;
  }

  function localeCode() {
    return { pt: "pt-AO", en: "en-US", es: "es-ES", fr: "fr-FR" }[currentLang] || "pt-AO";
  }

  function applyPage() {
    document.documentElement.lang =
      currentLang === "pt" ? "pt-AO" : currentLang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      const attr = el.dataset.i18nAttr;
      const value = t(key);
      if (attr === "placeholder") el.placeholder = value;
      else if (attr === "aria-label") el.setAttribute("aria-label", value);
      else if (attr === "title") el.title = value;
      else if (attr === "alt") el.setAttribute("alt", value);
      else el.textContent = value;
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      el.innerHTML = t(el.dataset.i18nHtml);
    });

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = t("meta.description");
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.content = t("meta.ogDescription");
  }

  function updateLangSwitcher() {
    document.querySelectorAll(".lang-switch__btn[data-lang]").forEach((btn) => {
      const active = btn.dataset.lang === currentLang;
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function setLang(lang) {
    if (!SUPPORTED.includes(lang)) lang = DEFAULT_LANG;
    currentLang = lang;
    window.IV_LANG = lang;
    window.IV_t = t;
    window.IV_locale = localeCode;
    applyPage();
    updateLangSwitcher();
    window.dispatchEvent(new CustomEvent("language-changed", { detail: { lang } }));
  }

  function initLangSwitcher() {
    document.querySelectorAll(".lang-switch__btn[data-lang]").forEach((btn) => {
      btn.addEventListener("click", () => {
        setLang(btn.dataset.lang);
      });
    });
    updateLangSwitcher();
  }

  window.IV_I18N = { t, setLang, detectLang, SUPPORTED, STRINGS };

  document.addEventListener("DOMContentLoaded", () => {
    setLang(detectLang());
    initLangSwitcher();
    window.addEventListener("languagechange", () => setLang(detectLang()));
  });
})();
