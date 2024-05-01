// components
import Spring from '@components/Spring';
import {NavLink} from 'react-router-dom';

const ProductGridItem = ({ product, index, isSlide }) => {
    const Wrapper = isSlide ? 'div' : Spring;
    const wrapperProps = isSlide ? {} : {type: 'slideUp', index};

    return (
        <Wrapper className="card flex flex-col h-full" {...wrapperProps}>
            <div className="flex items-start gap-[14px] mb-2.5">
                <div className="img-wrapper flex flex-1 items-center justify-center">
                    <img src={product.img} alt={product.name}/>
                </div>
            </div>
            <NavLink className={`h6 !leading-[1.4] block max-w-[180px] transition hover:text-accent ${isSlide ? 'mb-3' : ''}`}
                     to="/product-editor">
                {product.name}
            </NavLink>
           
            <div className={`flex flex-col flex-1 ${isSlide ? 'gap-1 mt-1.5' : 'gap-2.5 mt-2.5'}`}>
                <p className="font-heading font-bold text-sm leading-[1.4] text-green">
                    Available : {product.in_stock || 0}
                </p>
                <p className="font-heading font-bold text-sm leading-[1.4] text-accent">
                    Already sold : {product.sold || 0}
                </p>
                {
                    !isSlide && (
                        <>
                            <p className="font-heading font-bold text-sm leading-[1.4]">
                                Regular price : ${product.regular_price || 0}
                            </p>
                            <p className="font-heading font-bold text-sm leading-[1.4]">
                                Sale price : ${product.sale_price || 0}
                            </p>
                        </>
                    )
                }
            </div>
           
        </Wrapper>
    )
}

export default ProductGridItem