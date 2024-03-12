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
    const url = `${baseURL}${API_ENDPOINTS.ORDERS_DETAILS}/${data}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Tokenni so'rovga qo'shish
      },
    };
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
  }, [data]);

  return (
    <>
      {!isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          Загрузка...
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
                <div className="mb-8">
                  <div>
                    <span className="font-medium text-sm">Номер заказа :</span>{' '}
                    <span className="text-sm">{orderData?.id}</span>{' '}
                  </div>
                  <div>
                    {' '}
                    <span className="font-medium text-sm">
                      Номер телефона :
                    </span>{' '}
                    <span className="text-sm">{orderData?.phone_number}</span>{' '}
                  </div>
                  <div>
                    {' '}
                    <span className="font-medium text-sm">Адрес :</span>{' '}
                    <span className="text-sm">{orderData?.address}</span>
                  </div>
                  <div>
                    {' '}
                    <span className="font-medium text-sm">
                      Тип заказа :
                    </span>{' '}
                    <span className="text-sm">{orderData?.order_type_ln}</span>
                  </div>
                  <div>
                    {' '}
                    <span className="font-medium text-sm">
                      Способ оплаты :
                    </span>{' '}
                    <span className="text-sm">{orderData?.provider}</span>
                  </div>
                  <div>
                    {' '}
                    <span className="font-medium text-sm">
                      Положение дел :
                    </span>{' '}
                    <span>
                      <span
                        className="bullet"
                        style={{
                          backgroundColor:
                            orderData?.status_ln === 'Approved' ? 'green' : 'red',
                        }}
                      />
                      {orderData?.status_ln}
                    </span>
                  </div>
                  <div>
                    {' '}
                    <span className="font-medium text-sm">
                      Дата заказа :
                    </span>{' '}
                    <span className="text-sm">{orderData?.created_at}</span>
                  </div>
                </div>
                {orderData &&
                  orderData?.product_orders?.map((item: any, index: string) => (
                    <OrderDetailsContent key={index} item={item} />
                  ))}
                <div className="mt-3 ltr:text-right rtl:text-left">
                  <div className="text-black inline-flex flex-col text-[12px] md:text-[14px]">
                    <div className="pb-1 mb-2 border-b mt-3 border-border-base ltr:pl-20 rtl:pr-20">
                      <p className="flex justify-between mb-1">
                        <span className="ltr:mr-8 rtl:ml-8">Цена продукта: </span>
                        <span className="font-medium">
                          {addPeriodToThousands(orderData?.amounts?.products_amount)} so'm
                        </span>
                      </p>
                      <p className="flex justify-between mb-1">
                        <span className="ltr:mr-8 rtl:ml-8">Доставка: </span>
                        <span className="font-medium">
                          {addPeriodToThousands(orderData?.amounts?.shipping_amount)} so'm
                        </span>
                      </p>
                    </div>
                    <p className="ltr:pl-20 ">
                        <span className="ltr:mr-8 rtl:ml-8">Общая сумма: </span>
                        <span className="font-medium">
                          {addPeriodToThousands(orderData?.total_amount)} so'm
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
