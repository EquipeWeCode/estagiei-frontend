import { i18n } from "@/translations/i18n";
import { Switch, Image } from 'antd';

import usaIcon from "@/assets/bandeiras/usa.svg";
import brazilIcon from "@/assets/bandeiras/brazil.svg";
import { useState } from "react";
import { urlIconsType } from "@/types/urlIconsType";

const urlIcons: urlIconsType = {
    pt: brazilIcon,
    en: usaIcon
}

const TraducaoBtn = () => {

    const [iconUrl, setIconUrl] = useState("pt");

    const onChangeFlag = (language: string) => {
        i18n.changeLanguage(language);
        setIconUrl(language);
    }

    const onChangeSwitch = (boolParam: boolean) => {
        boolParam ? (onChangeFlag("pt")) : (onChangeFlag("en"))
    }

    const styles = {
        backgroundImage: `url(${urlIcons[iconUrl]})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    };

    return (
        <Switch defaultChecked onChange={onChangeSwitch} className="switch-div" style={styles} />
    );
}

export default TraducaoBtn;