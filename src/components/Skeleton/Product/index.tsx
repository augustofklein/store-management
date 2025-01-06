import Skeleton from "react-loading-skeleton";

//TODO: Verificar o carregamento do skeleton
const ProductSkeleton: React.FC = () => {
    return (
        <div className="max-w-xs rounded overflow-hidden shadow-lg mt-4 mr-4">
            <div className="w-full h-48 bg-gray-200">
                <Skeleton height="100%" />
            </div>
            <div className="px-6 py-4">
                <div className="mb-4 flex gap-2">
                    <Skeleton width={80} height={36} />
                    <Skeleton width={80} height={36} />
                </div>
                <div className="font-bold text-xl mb-2">
                    <Skeleton width="60%" />
                </div>
                <div className="text-gray-700 text-sm mb-2">
                    <Skeleton width="80%" />
                </div>
                <div className="text-gray-700 text-sm mb-2">
                    <Skeleton width="70%" />
                </div>
                <div className="text-gray-700 text-base">
                    <Skeleton width="50%" />
                </div>
            </div>
        </div>
    );
}
export default ProductSkeleton;