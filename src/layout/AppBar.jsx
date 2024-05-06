// components
import Search from '@ui/Search';
import Headroom from 'react-headroom';
import CustomTooltip from '@ui/CustomTooltip';
import ModalBase from '@ui/ModalBase';

// hooks
import {useTheme} from '@contexts/themeContext';
import {useSidebar} from '@contexts/sidebarContext';
import {useWindowSize} from 'react-use';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

// constants
import {LOCALES} from '@constants/options';

const LocaleMenu = ({active, setActive}) => {
    return (
        <div className="flex flex-col gap-4 p-4">
            {
                LOCALES.map(locale => (
                    <button key={locale.value}
                            className="group flex items-center gap-2.5 w-fit"
                            onClick={() => setActive(locale.value)}>
                        <img className="rounded-full w-5" src={locale.icon} alt={locale.label}/>
                        <span
                            className={`text-sm font-medium transition group-hover:text-accent ${active === locale.value ? 'text-accent' : 'text-header'}`}>
                            {locale.label}
                        </span>
                    </button>
                ))
            }
        </div>
    )
}

const AppBar = () => {
    const navigate = useNavigate();
    const [searchModalOpen, setSearchModalOpen] = useState(false);
    const [locale, setLocale] = useState('en-EN');
    const {width} = useWindowSize();
    const {theme, toggleTheme} = useTheme();
    const {setOpen} = useSidebar();

    const activeLocale = LOCALES.find(l => l.value === locale);

    useEffect(() => {
        setSearchModalOpen(false);
    }, [width]);

    return (
        <>
            <Headroom style={{zIndex: 999}}>
                <div className="flex items-center justify-between">
                    {
                        width < 1920 &&
                        <button className="icon text-2xl leading-none"
                                aria-label="Open sidebar"
                                onClick={() => setOpen(true)}>
                            <i className="icon-bars-solid"/>
                        </button>
                    }                     
                </div>
            </Headroom>
            {
                width < 768 &&
                <ModalBase open={searchModalOpen} onClose={() => setSearchModalOpen(false)}>
                    <div className="card max-w-[360px] w-full">
                        <h3 className="mb-3">Search</h3>
                        <Search placeholder="What are you looking for?"/>
                    </div>
                </ModalBase>
            }
          
        </>
    )
}

export default AppBar