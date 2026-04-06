const themes = [
    {value: "light",  label: "Light",  file: () => import('../public/CSS Themes/Light.css')  },
    { value: "dark",   label: "Dark",   file: () => import('../public/CSS Themes/Dark.css')   },
    { value: "forest",   label: "Forest",   file: () => import('../public/CSS Themes/Forest.css')   },
    { value: "sky",   label: "Sky",   file: () => import('../public/CSS Themes/Sky.css')   }
];

export default themes;