import { OrderDetailsContent } from './order-details-content';
import Heading from '@components/ui/heading';
import { IoClose } from 'react-icons/io5';

import { useUI } from '@contexts/ui.context';
import { useTranslation } from 'src/app/i18n/client';
import { useEffect, useState } from 'react';
import { baseURL } from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import axios from 'axios';
import { getToken } from '@framework/utils/get-token';
import { addPeriodToThousands } from '@components/cart/cart-item';

const OrderDrawer: React.FC<{ lang: string }> = ({ lang }) => {
  const { t } = useTranslation(lang, 'home');
  const { data, closeDrawer } = useUI();
  const [orderData, setOrderData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function getOrders() {
    const token = getToken();
    const headers = {
      'Accept-Language': lang,
      Authorization: `Bearer ${token}`,
    };

    const url = `${baseURL}${API_ENDPOINTS.ORDERS_DETAILS}/${data}`;
    const config = { headers };
    try {
      setIsLoading(false);
      const response = await axios.get(url, config);
      const dataRes = response.data;
      setOrderData(dataRes);
    } catch (error) {
      console.error('Xatolik:', error);
    }
    setIsLoading(true);
  }

  useEffect(() => {
    getOrders();
  }, [data, lang]);

  return (
    <>
      {!isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          {t('Загрузка...')}
        </div>
      ) : (
        orderData !== null && (
          <>
            <div className="block">
              <div className="relative flex items-center justify-between w-full border-b ltr:pl-5 rtl:pr-5 md:ltr:pl-7 md:rtl:pr-7 border-border-base">
                <Heading variant="titleMedium">{t('Детали заказов')}:</Heading>
                <button
                  className="flex items-center justify-center px-4 py-6 text-2xl transition-opacity md:px-6 lg:py-7 focus:outline-none text-brand-dark hover:opacity-60"
                  onClick={closeDrawer}
                  aria-label="close"
                >
                  <IoClose />
                </button>
              </div>

              <div className="p-5 ">
                <div className="mb-8 w-100 mr-10 ">
                  <div className='w-full flex justify-between gap-3 mb-3'>
                    <span className="font-medium text-sm">
                      {t('Номер заказа')} :
                    </span>{' '}
                    <span className="text-sm">{orderData?.id}</span>{' '}
                  </div>
                  <div className='w-full flex justify-between gap-3 mb-3'>
                    {' '}
                    <span className="font-medium text-sm">
                      {t('Номер телефона')} :
                    </span>{' '}
                    <span className="text-sm">{orderData?.phone_number}</span>{' '}
                  </div>
                  <div className='w-full flex justify-between gap-3 mb-3' >
                    {' '}
                    <span className="font-medium text-sm">
                      {t('Адрес')} :
                    </span>{' '}
                    <span className="text-sm">{orderData?.address}</span>
                  </div>
                  <div className='w-full flex justify-between gap-3 mb-3' >
                    {' '}
                    <span className="font-medium text-sm">
                      {t('Тип заказа')} :
                    </span>{' '}
                    <span className="text-sm">{orderData?.order_type_ln}</span>
                  </div>
                  <div className='w-full flex justify-between gap-3 mb-3' >
                    {' '}
                    <span className="font-medium text-sm">
                      {t('Способ оплаты')} :
                    </span>{' '}
                    <span className="text-sm">{orderData?.provider}</span>
                  </div>
                  <div className='w-full flex justify-between gap-3 mb-3' >
                    {' '}
                    <span className="font-medium text-sm">
                      {t('Положение дел')} :
                    </span>{' '}
                    <span>
                      <span
                        className="bullet"
                        style={{
                          backgroundColor:
                            orderData?.status_ln === 'Approved' ||
                            orderData?.status_ln === 'Одобренный' ||
                            orderData?.status_ln === 'Tasdiqlandi'
                              ? 'green'
                              : orderData?.status_ln === 'Cancelled' ||
                                  orderData?.status_ln === 'Отменено' ||
                                  orderData?.status_ln === 'Bekor qilindi'
                                ? 'red'
                                : '',
                        }}
                      />
                      {orderData?.status_ln}
                    </span>
                  </div>
                  <div className='w-full flex justify-between gap-3 mb-3'>
                    {' '}
                    <span className="font-medium text-sm">
                      {t('Дата заказа')} :
                    </span>{' '}
                    <span className="text-sm">{orderData?.created_at}</span>
                  </div>
                </div>
                {orderData &&
                  orderData?.product_orders?.map((item: any, index: string) => (
                    <OrderDetailsContent key={index} item={item} lang={lang} />
                  ))}
                <div className="mt-3 ">
                  <div className="text-black inline-flex flex-col text-[12px] w-full md:text-[14px] ">
                    <div className="pb-1 mb-2 border-b mt-3 border-border-base w-full pr-8">
                      <p className="w-full flex justify-between mb-1">
                        <span >
                          {t('Цена продукта')}:{' '}
                        </span>
                        <span className="font-medium">
                          {addPeriodToThousands(
                            orderData?.amounts?.products_amount,
                          )}{' '}
                          {t('сум')}
                        </span>
                      </p>
                      <p className="flex justify-between mb-1">
                        <span>
                          {t('Доставка')}:{' '}
                        </span>
                        <span className="font-medium">
                          {addPeriodToThousands(
                            orderData?.amounts?.shipping_amount,
                          )}{' '}
                          {t('сум')}
                        </span>
                      </p>
                    </div>
                    <p >
                      <span >
                        {t('Общая сумма')}:{' '}
                      </span>
                      <span className="font-medium">
                        {addPeriodToThousands(orderData?.total_amount)}{' '}
                        {t('сум')}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      )}
    </>
  );
};

export default OrderDrawer;
