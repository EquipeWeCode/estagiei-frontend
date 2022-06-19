import { i18n } from "@/translations/i18n";
import { Switch, Image } from 'antd';

import usaIcon from "@/assets/bandeiras/usa.svg";
import brazilIcon from "@/assets/bandeiras/brazil.svg";
import { useState } from "react";

const urlIcons = {
    "pt": brazilIcon,
    "en": usaIcon
}

const TraducaoBtn = () => {

    const [iconUrl, setIconUrl] = useState(brazilIcon);

    const onChangeFlag = (language: string) => {
        i18n.changeLanguage(language);
        if(language == "en"){
            setIconUrl(usaIcon);
        }
        else{
            setIconUrl(brazilIcon)
        }
    }

    const styles = {
        backgroundImage: `url(${iconUrl})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    };

    const onChangeSwitch = (boolParam: boolean) => {
        boolParam ? (onChangeFlag("pt")) : (onChangeFlag("en"))
    }

    return (
        <Switch defaultChecked onChange={onChangeSwitch} className="switch-div" style={styles} size="default"/>
    );
}

export default TraducaoBtn;