// components

import Timestamp from '@ui/Timestamp';
import {NavLink} from 'react-router-dom';
import Trend from '@ui/Trend';
import Counter from '@components/Counter';
import Button from '@mui/material/Button';
// utils
import {getCategory, getStatusColor, numFormatter} from '@utils/helpers';
import dayjs from 'dayjs';

export const ORDERS_COLUMN_DEFS = [
    {
        title: '# order',
        dataIndex: 'orderNumber',
        width: '100px',
        render: text => <span className="subheading-2">#{text}</span>
    },
    {
        title: 'Product',
        dataIndex: 'product',
        className: 'product-cell',
        render: product =>
            <div className="flex gap-6">
                <div className="img-wrapper w-[70px] h-[64px] flex items-center justify-center shrink-0">
                    <img src={product.image} alt={product.name}/>
                </div>
                <div className="flex-col hidden 2xl:flex">
                    <h5 className="text-sm max-w-[195px] mb-1.5">{product.name}</h5>
                    <div className="flex flex-col gap-1 text-sm">
                        <p>Regular price: ${product.regular_price}</p>
                        {product.sale_price && <p>Sale price: ${product.sale_price}</p>}
                    </div>
                </div>
            </div>,
        responsive: ['lg'],
    },
    {
        title: 'SKU',
        dataIndex: 'sku',
    },
    {
        title: 'Category',
        dataIndex: 'category',
        render: category =>
            <div className="flex items-center gap-4">
                <div className={`badge-icon badge-icon--sm bg-${getCategory(category).color}`}>
                    <i className={`${getCategory(category).icon} text-base`}/>
                </div>
                <span className="label-text">{getCategory(category).label}</span>
            </div>,
        responsive: ['lg'],
    },
    {
        title: 'Payment',
        dataIndex: 'payment',
        render: payment => {
            const status = payment.amount === payment.received ?
                'Fully paid'
                :
                (payment.amount > payment.received && payment.received !== 0) ? 'Partially paid' : 'Unpaid';

            return (
                <div className="flex flex-col">
                    <span className="font-heading font-bold text-header">
                        {status !== 'Fully paid' && `$${payment.received} / from `}
                        ${payment.amount}
                    </span>
                    <span>{status}</span>
                </div>
            )
        }
    },
    {
        title: 'Order Status',
        dataIndex: 'status',
        render: status =>
            <span className="badge-status badge-status--lg"
                  style={{backgroundColor: `var(--${getStatusColor(status)})`}}>
                {status}
            </span>
    },
    {
        title: 'Rate',
        dataIndex: 'rating',
        
        responsive: ['xl'],
    },
    {
        title: 'Actions',
        dataIndex: 'actions',
        width: '70px',
        render: () =>
            <div className="flex items-center justify-end gap-11">
                <NavLink to="/product-editor" aria-label="Edit">
                    <i className="icon icon-pen-to-square-regular text-lg leading-none"/>
                </NavLink>
               
            </div>
    }
];

export const TRANSACTIONS_COLUMN_DEFS = [
    {
        title: 'Date & Time',
        dataIndex: 'timestamp',
        render: timestamp => <Timestamp date={timestamp}/>,
    },
    {
        title: 'Seller',
        dataIndex: 'seller',
        render: (text, record) => {
            return (
                <>
                    {
                        record.seller ?
                            <div className="flex items-center gap-[18px]">
                                <div
                                    className="img-wrapper w-[60px] h-[60px] flex items-center justify-center shrink-0">
                                    <img className="max-w-[50px]" src={record.seller.logo} alt={record.seller.name}/>
                                </div>
                                <span className="hidden truncate lg:inline">{record.seller.name}</span>
                            </div>
                            :
                            'N/A'
                    }
                </>
            )
        }

    },
    {
        title: 'SKU',
        dataIndex: 'sku',
        responsive: ['lg'],
    },
    {
        title: 'Method',
        dataIndex: 'method',
        responsive: ['xxl'],
    },
    {
        title: 'Type',
        dataIndex: 'type',
        render: type => <span className="capitalize">{type}</span>
    },
    {
        title: 'Status',
        dataIndex: 'status',
        render: status =>
            <span className="badge-status" style={{backgroundColor: `var(--${getStatusColor(status)})`}}>
                {status}
            </span>
    },
    {
        title: 'Country',
        dataIndex: 'country',
        responsive: ['xxl'],
    },
    {
        title: 'Curr',
        dataIndex: 'currency',
        responsive: ['xl'],
    },
    {
        title: 'Fee',
        dataIndex: 'fee',
        responsive: ['xl'],
    },
    {
        title: 'Tax',
        dataIndex: 'tax',
        responsive: ['xl'],
    },
    {
        title: 'Total',
        dataIndex: 'total',
        render: (text, record) => {
            const total = record.fee - (record.fee / 100 * record.tax);

            return <span className="font-heading font-semibold text-header">${total.toFixed(2)}</span>
        }
    }
];

export const SELLERS_COLUMN_DEFS = [
    {
        title: 'Seller',
        dataIndex: 'seller',
        render: (text, record) =>
            <div className="flex gap-[26px]">
                <div className="img-wrapper flex items-center justify-center w-[63px] h-[63px] shrink-0">
                    <img className="max-w-[50px]" src={record.logo} alt={record.name}/>
                </div>
                <div className="flex flex-col items-start">
                    <a className="subheading-2" href={record.website} target="_blank" rel="noreferrer">
                        www.website.com
                    </a>
                    <a className="mt-3 mb-2.5" href={`tel:${record.phone}`}>{record.phone}</a>
                    <a href={`mailto:${record.email}`}>{record.email}</a>
                </div>
            </div>
    },
    {
        title: 'Orders value',
        dataIndex: 'ordersValue',
        render: () =>
            <div className="flex flex-col">
                <Counter className="h3" num={65874}/>
                <span className="label-text mt-0.5 mb-2.5">New orders</span>
                <Trend value={55.96}/>
            </div>,
        responsive: ['lg'],
    },
    {
        title: 'Income value',
        dataIndex: 'incomeValue',
        render: () =>
            <div className="flex flex-col">
                <Counter className="h3" num={23000} prefix="$" isFormatted/>
                <span className="label-text mt-0.5 mb-2.5">Income</span>
                <Trend value={14.56}/>
            </div>,
        responsive: ['lg'],
    },
    {
        title: 'Review rate',
        dataIndex: 'rating',
       
    },
    {
        title: 'Sales categories value',
        dataIndex: 'salesCategoriesValue',
        render: (text, record) =>
            <div className="flex flex-col gap-2.5 max-w-[220px]">
                <div className="flex justify-between font-heading font-bold text-sm">
                    <span>Electronics</span>
                    <span className="text-header text-right">
                        {numFormatter(record.profit.electronics, 2, '$')}
                    </span>
                </div>
                <div className="flex justify-between font-heading font-bold text-sm">
                    <span>Fashion</span>
                    <span className="text-header text-right">
                        {numFormatter(record.profit.fashion, 2, '$')}
                    </span>
                </div>
                <div className="flex justify-between font-heading font-bold text-sm">
                    <span>Food & Drinks</span>
                    <span className="text-header text-right">
                        {numFormatter(record.profit.food, 2, '$')}
                    </span>
                </div>
                <div className="flex justify-between font-heading font-bold text-sm">
                    <span>Services</span>
                    <span className="text-header text-right">
                        {numFormatter(record.profit.services, 2, '$')}
                    </span>
                </div>
            </div>,
        responsive: ['xl'],
    },
    {
        title: 'Other',
        dataIndex: 'other',
        render: () =>
            <div className="flex items-center justify-end gap-5">
                <button aria-label="Edit">
                    <i className="icon icon-pen-to-square-regular text-lg leading-none"/>
                </button>
               
            </div>
    }
]

export const PRODUCTS_MANAGEMENT_COLUMN_DEFS = [
    {
        title: <div className="flex items-center justify-center">
            <i className="icon-image-regular text-[26px]"/>
        </div>,
        dataIndex: 'image',
        width: 45,
        render: (image, record) => (
            <div className="img-wrapper w-[45px] h-[45px] flex items-center justify-center">
                <img src={record.product_thumb} alt="product"/>
            </div>
        )
    },
    {
        title: 'Product name',
        dataIndex: 'product_name',
        render: (product_name) => <span className="inline-block h6 !text-sm max-w-[155px]">{product_name}</span>
    },
    {
        title: 'Quantity',
        dataIndex: 'product_quantity',
        width: 130,
        render: product_quantity =>
            <div className="flex items-center gap-5">
                {                 
                        <span>                   
                        ({product_quantity})
                        </span>
                }
            </div>
    },
    {
        title: 'Price',
        dataIndex: 'product_price',
        render: product_price => <span>${product_price}</span>
    },
    // {
    //     title: 'Status',
    //     dataIndex: 'is_deleted',
    //     render: product_is_deleted => <span className="capitalize">
    //         {product_is_deleted ?<Button  variant="contained" color="success">Secondary</Button> : <Button variant="contained" color="success">Secondary</Button>}
    //         </span>,
    //     responsive: ['lg'],
    // },
   
   
    {
        title: 'Description',
        dataIndex: 'product_description',
        render: product_description =>
            <div className="flex flex-col">
                <span className="font-bold text-header">
                  {product_description}
                </span>
            </div>,
        responsive: ['lg'],
    },
    {
        title: 'Date',
        dataIndex: 'created_at',
        render: created_at =>
            <div className="flex flex-col">
                <span className="font-bold text-header">
                    {created_at}
                </span>
            </div>,
        responsive: ['lg'],
    },
]