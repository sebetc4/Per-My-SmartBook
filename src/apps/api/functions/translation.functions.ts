import { Namespace } from 'i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

type ArrayElementOrSelf<T> = T extends Array<infer U> ? U[] : T[];

export const customServerSideTranslations = (locale: string, namespacesRequired?: ArrayElementOrSelf<Namespace>) => {
    let commonNamespacesRequired: ArrayElementOrSelf<Namespace> = ['common', 'header', 'alert'];
    if (typeof namespacesRequired === 'string') {
        commonNamespacesRequired.push(namespacesRequired);
    } else if (namespacesRequired) {
        commonNamespacesRequired = [...commonNamespacesRequired, ...namespacesRequired];
    }
    return serverSideTranslations(locale, commonNamespacesRequired);
};
