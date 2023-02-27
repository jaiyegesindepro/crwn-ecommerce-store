import { Link } from 'react-router-dom';

import ProductCard from '../product-card/product-card.component';

import {CategotyPreviewContainer, Preview, Title} from './category-preview.styles.jsx';

const CategoryPreview = ({ title, products }) => {
    return (
        <CategotyPreviewContainer>
            <h2>
                <Title as='span' to={title}>{title.toUpperCase()}</Title>
            </h2>
            <Preview>
                {
                    products.filter((_, idx) => idx < 4)
                            .map((product) => 
                            <ProductCard key={product.id} product={product} />)
                }
            </Preview>
        </CategotyPreviewContainer>
    )
}

export default CategoryPreview;