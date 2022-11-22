import Button from "@/components/common/Button";
import DetailsItem from "@/components/common/DetailsItem";
import ImageNotFound from "@/components/common/ImageNotFound";
import Input from "@/components/common/Input";
import { UserType } from "@/types/userTypes";
import { cpfCnpjMask, dateMask } from "@/utils/masks";
import { Row } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PerfilEmpresaProps } from "../PerfilEmpresa";
import { getEndereco } from "@/components/common/CardVagas/DescricaoVaga/DescricaoVaga";
import { message } from "antd";
import { putEmpresa } from "@/services/empresa";
import styles from "./styles.module.css";
import { useAuth } from "@/contexts/auth";

const DadosBasicos = ({ user }: PerfilEmpresaProps) => {
	const { t } = useTranslation();
	const [edicao, isEdicao] = useState<boolean>(false);
	const [empresa, setEmpresa] = useState<UserType>(user);
	const { setUserContextAndLocalStorage } = useAuth();

	const editarPerfil = () => {
		if (!edicao) { 
			setEmpresa(user);
		}
		isEdicao(!edicao);
	}

	const alterarEmpresa = (e: any) => {
		const { name, value } = e.target;
		const empresaAlterada = {
			...empresa,
			[name]: value
		}
		console.log(name, value);
		setEmpresa(empresaAlterada);
	}

	const salvarEmpresa = async () => {
		const { status, data } = await putEmpresa(empresa.codEmpresa, empresa);
		if (status === 200) {
			message.success(t("company_updated"));
			setUserContextAndLocalStorage({ ...user, ...data });
			isEdicao(false);
		}
	}

	return (
		<>
			<Row justify="center" align="middle">
				<span className={styles.containerFoto}>
					{user.avatar ? <img src={user.avatar} alt="Avatar" /> : <ImageNotFound width={100} />}
				</span>
			</Row>
			<Row align="middle" style={{ marginTop: "10px" }} gutter={[0, 12]}>
				<DetailsItem sm={48} md={24} label="CNPJ" value={
					edicao ? <Input maxLength={16} name="cnpj" value={cpfCnpjMask(empresa.cnpj)} onChange={alterarEmpresa} />: cpfCnpjMask(user.cnpj)}/>
				<DetailsItem sm={48} md={24}  label={t("trading_name")} value={
					edicao ? <Input maxLength={50} name="nomeFantasia" value={empresa.nomeFantasia} onChange={alterarEmpresa} /> : user.nomeFantasia}/>
				<DetailsItem sm={48} md={24} label={t("company_name")} value={
					edicao ? <Input maxLength={50} name="razaoSocial" value={empresa.razaoSocial} onChange={alterarEmpresa} /> : user.razaoSocial}/>
				<DetailsItem sm={48} md={24} label={t("inclusion_date")} value={dateMask(user.auditoria?.dataInclusao)}/>
				<DetailsItem sm={48} md={24} label={t("address")} value={user?.endereco?.codEndereco ? getEndereco(user?.endereco, true) : t("not_informed")}/>
			</Row>
			<Row align="middle" justify="end">
				{edicao ? 
				<div>
					<Button className={styles.btnCancelar} label={t("cancel")} onClick={editarPerfil}/>
					<Button className={styles.btnSalvar} label={t("save")} onClick={salvarEmpresa}/>
				</div> : <Button  label={t("edit_profile")} onClick={() => editarPerfil()}/>}
			</Row>
		</>
	);
};

export default DadosBasicos;
