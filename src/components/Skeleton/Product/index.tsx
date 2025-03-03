import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

//TODO: Verificar o carregamento do skeleton
const ProductSkeleton: React.FC = () => {
    return (
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <p>
                <Skeleton count={3} />
            </p>
        </SkeletonTheme>
    );
}
export default ProductSkeleton;