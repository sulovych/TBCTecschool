/**
 * პორტფოლიოს სტატიკური მონაცემები
 */

export const personalInfo = {
    name: "ლუკა სულაძე",
    role: "Software Developer & Programming Student",
    description: "სპეციალიზებული ვარ დაბალი დონის პროგრამირებაში, დესკტოპ ინსტრუმენტების შექმნასა და სისტემურ ოპტიმიზაციაში.",
    status: "Available for collaboration & projects",
    email: "lsuladze1337@gmail.com",
    github: "https://github.com/sulovych",
    githubUsername: "github.com/sulovych"
};

export const aboutData = {
    title: "ჩემ შესახებ",
    bio: "ვსწავლობ პროგრამირებას და პარალელურად აქტიურად ვარ დაკავებული პროგრამული უზრუნველყოფის დეველოპმენტით. ჩემი ინტერესის სფეროა სკრიპტინგი, მეხსიერების მანიპულაციები, UI/UX ინტერფეისების აგება და დესკტოპ ავტომატიზაცია.",
    highlights: [
        {
            icon: "⚡",
            label: "ფოკუსი",
            value: "დაბალი დონე & C++"
        },
        {
            icon: "🛠️",
            label: "მიმართულება",
            value: "Lua, Automation, Tools"
        },
        {
            icon: "🔍",
            label: "ინტერესი",
            value: "Memory & Reverse Eng"
        }
    ]
};

export const techSkills = [
    {
        name: "Lua 5.1 / LuaJIT",
        details: "MoonLoader სკრიპტები, SAMPFUNCS, SAMP.Lua, Dear ImGui (mimgui)",
        color: "indigo"
    },
    {
        name: "C++",
        details: "Dynamic-Link Libraries (DLL), Memory hooks & patches, Visual Studio",
        color: "cyan"
    },
    {
        name: "Python 3",
        details: "დესკტოპ ავტომატიზაცია, Tkinter, pynput, discord.py",
        color: "emerald"
    },
    {
        name: "Pawn",
        details: "SA-MP Gamemodes & Filterscripts (Pawn compiler 3.10.10)",
        color: "amber"
    },
    {
        name: "AutoHotkey",
        details: "მაკროსები და ავტომატიზაციის სკრიპტები",
        color: "rose"
    }
];

export const additionalSkills = [
    {
        title: "კოდის ოპტიმიზაცია და დებაგინგი",
        description: "ეფექტური ალგორითმები, მეხსიერების მენეჯმენტი და შეცდომების დროული აღმოჩენა."
    },
    {
        title: "Reverse Engineering-ის ბაზისები & Deobfuscation",
        description: "ბინარული ფაილების ანალიზი, მეხსიერების სტრუქტურების კვლევა და ლოგიკის ამოხსნა."
    }
];

export const projectsData = [
    {
        id: 1,
        title: "MoonLoader Script Auto-Updater",
        tag: "Lua / MoonLoader",
        tagVariant: "indigo",
        description: "ღია კოდის მქონე ინსტრუმენტი Lua სკრიპტების ვერსიების შესამოწმებლად და ავტონომიური განახლებისთვის."
    },
    {
        id: 2,
        title: "EDRP Pause Menu Switcher",
        tag: "CEF / Lua Mod",
        tagVariant: "cyan",
        description: "MoonLoader Lua მოდიფიკაცია GTA SA-ს სტანდარტულ და custom CEF პაუზის მენიუებს შორის გადასართავად."
    },
    {
        id: 3,
        title: "Desktop Automation & Mute Bot",
        tag: "Python / Tkinter",
        tagVariant: "purple",
        description: "Python-ზე აგებული დესკტოპ აპლიკაცია Tkinter-ითა და Discord ბოტით, რომელიც მართავს ხმოვან არხებს hotkey-ების გამოყენებით."
    }
];

