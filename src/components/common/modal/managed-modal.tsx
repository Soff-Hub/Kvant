'use client';

import Modal from '@components/common/modal/modal';
import dynamic from 'next/dynamic';
import {
  useModalAction,
  useModalState,
} from '@components/common/modal/modal.context';

const LoginForm = dynamic(() => import('@components/auth/login-form'));
const SignUpForm = dynamic(() => import('@components/auth/sign-up-form'));
const ForgetPasswordFormModal = dynamic(
  () => import('@components/auth/forget-password-form-modal'),
);
const ProductPopup = dynamic(() => import('@components/product/product-popup'));
const CategoryPopup = dynamic(
  () => import('@components/category/category-popup'),
);

export default function ManagedModal({ lang }: { lang: string }) {
  const { isOpen, view } = useModalState();
  const { closeModal } = useModalAction();

  if (view === 'CATEGORY_VIEW') {
    return (
      <Modal open={isOpen} onClose={closeModal} variant="bottom">
        {view === 'CATEGORY_VIEW' && <CategoryPopup lang={lang} />}
      </Modal>
    );
  }

  return (
    <Modal open={isOpen} onClose={closeModal}>
      {view === 'LOGIN_VIEW' && <LoginForm lang={lang} />}
      {view === 'SIGN_UP_VIEW' && <SignUpForm lang={lang} />}
      {view === 'FORGET_PASSWORD_MODAL' && (
        <ForgetPasswordFormModal lang={lang} />
      )}
      {view === 'PRODUCT_VIEW' && <ProductPopup lang={lang} />}
    </Modal>
  );
}
