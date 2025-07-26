import ApperIcon from "@/components/ApperIcon";

const Loading = ({ type = "default", message = "Loading..." }) => {
  const LoadingCard = () => (
    <div className="bg-white rounded-xl border border-gray-100 shadow-card p-6 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg" />
        <div className="flex-1 space-y-3">
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4" />
          <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2" />
          <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-2/3" />
        </div>
      </div>
    </div>
  );

  const LoadingList = () => (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg border border-gray-100 p-4 animate-pulse">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/3" />
              <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/4" />
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24" />
              <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  if (type === "cards") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <LoadingCard key={i} />
        ))}
      </div>
    );
  }

  if (type === "list") {
    return <LoadingList />;
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="relative">
        <div className="w-16 h-16 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-full flex items-center justify-center">
          <ApperIcon name="Loader2" className="animate-spin text-primary" size={32} />
        </div>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">{message}</h3>
        <p className="text-gray-600">Please wait while we process your request...</p>
      </div>
    </div>
  );
};

export default Loading;