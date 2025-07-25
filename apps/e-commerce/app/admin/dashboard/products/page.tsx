// "use client";

// import { useEffect, useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Plus,
//   Search,
//   Filter,
//   MoreVertical,
//   Eye,
//   Edit,
//   Trash2,
// } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/redux/store";
// import { deleteProduct, fetchProducts } from "@/redux/slices/productSlice";
// import ButtonLoader from "@/app/components/loaders/ButtonLoader";
// import toast from "react-hot-toast";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { capitalizeWords } from "@/app/types/products";
// import DeleteProduct from "./DeleteProduct";
// import { Pagination } from "@/app/components/pagination/pagination";
// import { Separator } from "@/components/ui/separator";
// import { Input } from "@/components/ui/input";

// export default function ProductsPage() {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);
//   const dispatch: AppDispatch = useDispatch();
//   const { products } = useSelector((state: RootState) => state.product);

//   const [selectedProductId, setSelectedProductId] = useState<number>();
//   const [showDeleteDialog, setShowDeleteDialog] = useState(false);

//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilters, setStatusFilters] = useState<string[]>([]);
//   const [paymentFilters, setPaymentFilters] = useState<string[]>([]);
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const ordersPerPage = 10;

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   const handleView = (product: any) => {
//     router.push(`/admin/dashboard/products/${product.id}`);
//   };

//   const handleEdit = (product: any) => {
//     setIsLoading(true);
//     router.push(`/admin/dashboard/products/edit/${product.id}`);
//   };

//   const handleDelete = async () => {
//     const id: number = Number(selectedProductId);
//     try {
//       await dispatch(deleteProduct(id)).unwrap(); // ✅ Correct way to dispatch
//       // toast.success("Product deleted successfully");
//       setShowDeleteDialog(false);
//     } catch (error) {
//       // console.error("Failed to delete product:", error);
//       toast.error("Failed to delete product");
//     }
//   };

//   // Filter orders based on search term and filters
//   const filteredProduct = products.filter((product) => {
//     // Search term matching
//     const searchLower = searchTerm.toLowerCase();
//     const matchesSearch =
//       product.id.toString().includes(searchLower) ||
//       product.name.toLowerCase().includes(searchLower) ||
//       product.status.toLowerCase().includes(searchLower) ||
//       product.category.toLowerCase().includes(searchLower) ||
//       product.price.toString().includes(searchLower);
//     product.description.toString().includes(searchLower);
//     product?.brand?.toString().includes(searchLower);

//     // Status filter matching
//     const matchesStatus =
//       statusFilters.length === 0 || statusFilters.includes(product.status);

//     // Payment filter matching
//     // const matchesPayment =
//     //   paymentFilters.length === 0 ||
//     //   paymentFilters.includes(product.paymentStatus);

//     // return matchesSearch && matchesStatus && matchesPayment;
//     return matchesSearch && matchesStatus;
//   });

//   // Pagination calculations
//   const totalPages = Math.ceil(filteredProduct?.length / ordersPerPage);
//   const indexOfLastorder = currentPage * ordersPerPage;
//   const indexOfFirstorder = indexOfLastorder - ordersPerPage;
//   const currentProduct = filteredProduct?.slice(
//     indexOfFirstorder,
//     indexOfLastorder
//   );

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   return (
//     <>
//       {showDeleteDialog === true && (
//         <DeleteProduct
//           setShowDeleteDialog={setShowDeleteDialog}
//           handleDelete={handleDelete}
//         />
//       )}
//       <div className="p-6 space-y-6">
//         <div className="flex justify-between items-center">
//           <h1 className="text-2xl font-semibold text-gray-800">Products</h1>
//           <Button
//             className="bg-primary w-36 bg-orange-500 hover:bg-orange-600"
//             onClick={() => {
//               setIsLoading(true);
//               router.push("/admin/dashboard/products/upload");
//             }}
//           >
//             {isLoading === false && <Plus className="w-4 h-4 mr-2" />}
//             {isLoading === true ? <ButtonLoader /> : "Add Product"}
//           </Button>
//         </div>

//         <Card className="p-6">
//           <div className="flex justify-between items-center mb-6">
//             <div className="flex items-center space-x-4 flex-1 max-w-md">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <Input
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   type="text"
//                   placeholder="Search products..."
//                   className=" focus-visible:ring-orange-500 pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary/50"
//                 />
//               </div>
//               <Button variant="outline" className="flex items-center">
//                 <Filter className="w-4 h-4 mr-2" /> Filter
//               </Button>
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Product Name</TableHead>
//                   <TableHead>Category</TableHead>
//                   <TableHead>Price</TableHead>
//                   <TableHead>Stock</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {currentProduct.length > 0 ? (
//                   <>
//                     {currentProduct?.map((product) => (
//                       <TableRow key={product.id}>
//                         <TableCell className="font-medium">
//                           {product.name}
//                         </TableCell>
//                         <TableCell>
//                           {capitalizeWords(product.category)}
//                         </TableCell>
//                         <TableCell>${product.price}</TableCell>
//                         <TableCell>{product.stock}</TableCell>
//                         <TableCell>
//                           <span
//                             className={`px-2 py-1 rounded-full text-xs font-semibold bg-green-100 ${
//                               product.stock > 0
//                                 ? "text-green-800"
//                                 : "text-red-700"
//                             }`}
//                           >
//                             {product.stock > 0 ? "In Stock" : "Out of Stock"}
//                           </span>
//                         </TableCell>
//                         <TableCell>
//                           {/* <Button variant="ghost" size="sm">
//                         <MoreVertical className="w-4 h-4" />
//                       </Button> */}

//                           <DropdownMenu>
//                             <DropdownMenuTrigger asChild>
//                               <Button variant="ghost" size="sm">
//                                 <MoreVertical className="w-4 h-4" />
//                               </Button>
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent align="end">
//                               <DropdownMenuItem
//                                 onClick={() => handleView(product)}
//                               >
//                                 <Eye className="w-4 h-4 mr-2" /> View
//                               </DropdownMenuItem>
//                               <DropdownMenuItem
//                                 onClick={() => handleEdit(product)}
//                               >
//                                 <Edit className="w-4 h-4 mr-2" /> Edit
//                               </DropdownMenuItem>
//                               <DropdownMenuItem
//                                 className="text-red-600"
//                                 onClick={() => {
//                                   setSelectedProductId(product.id);
//                                   setShowDeleteDialog(true);
//                                 }}
//                               >
//                                 <Trash2 className="w-4 h-4 mr-2" /> Delete
//                               </DropdownMenuItem>
//                             </DropdownMenuContent>
//                           </DropdownMenu>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </>
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={7} className="text-center py-4">
//                       {searchTerm ||
//                       statusFilters.length > 0 ||
//                       paymentFilters.length > 0
//                         ? "No orders match your criteria"
//                         : "No orders found"}
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </div>
//           <div className="pt-1">
//             <Separator />
//             <div className="pt-5">
//               <Pagination
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 onPageChange={handlePageChange}
//               />
//             </div>
//           </div>
//         </Card>
//       </div>
//     </>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { deleteProduct, fetchProducts } from "@/redux/slices/productSlice";
import ButtonLoader from "@/app/components/loaders/ButtonLoader";
import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { capitalizeWords } from "@/app/types/products";
import DeleteProduct from "./DeleteProduct";
import { Pagination } from "@/app/components/pagination/pagination";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

export default function ProductsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.product);

  const [selectedProductId, setSelectedProductId] = useState<number>();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilters, setStatusFilters] = useState<string[]>([]);
  const [paymentFilters, setPaymentFilters] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const ordersPerPage = 10;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleView = (product: any) => {
    router.push(`/admin/dashboard/products/${product.id}`);
  };

  const handleEdit = (product: any) => {
    setIsLoading(true);
    router.push(`/admin/dashboard/products/edit/${product.id}`);
  };

  const handleDelete = async () => {
    const id: number = Number(selectedProductId);
    try {
      await dispatch(deleteProduct(id)).unwrap();
      setShowDeleteDialog(false);
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  const filteredProduct = products.filter((product) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      product.id.toString().includes(searchLower) ||
      product.name.toLowerCase().includes(searchLower) ||
      product.status.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower) ||
      product.price.toString().includes(searchLower);
    product.description.toString().includes(searchLower);
    product?.brand?.toString().includes(searchLower);

    const matchesStatus =
      statusFilters.length === 0 || statusFilters.includes(product.status);

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredProduct?.length / ordersPerPage);
  const indexOfLastorder = currentPage * ordersPerPage;
  const indexOfFirstorder = indexOfLastorder - ordersPerPage;
  const currentProduct = filteredProduct?.slice(
    indexOfFirstorder,
    indexOfLastorder
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      {showDeleteDialog === true && (
        <DeleteProduct
          setShowDeleteDialog={setShowDeleteDialog}
          handleDelete={handleDelete}
        />
      )}
      <div className="p-3 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
            Products
          </h1>
          <Button
            className="bg-primary w-full md:w-36 bg-orange-500 hover:bg-orange-600"
            onClick={() => {
              setIsLoading(true);
              router.push("/admin/dashboard/products/upload");
            }}
          >
            {isLoading === false && <Plus className="w-4 h-4 mr-2" />}
            {isLoading === true ? <ButtonLoader /> : "Add Product"}
          </Button>
        </div>

        {/* <Card className="p-4 md:p-6 md:max-w-[450px] w-auto"> */}
        <Card className="p-4 md:p-6 ">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            {/* <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4 w-full md:flex-1 md:max-w-md"> */}
            <div className="flex items-center space-x-4 w-full flex-1 max-w-md">
              <div className="relative w-full md:flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  type="text"
                  placeholder="Search products..."
                  className="focus-visible:ring-orange-500 pl-10 pr-4 h-8 bg-gray-50/85 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <Button
                variant="outline"
                className="flex h-8 items-center md:w-auto"
              >
                <Filter className="w-4 h-4 mr-2" /> Filter
              </Button>
            </div>
          </div>

          <div className="relative overflow-x-auto shadow-sm sm:rounded-lg">
            <div className="block w-full overflow-x-auto">
              <Table className="w-full min-w-[700px] md:min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">
                      Product Name
                    </TableHead>
                    <TableHead className="whitespace-nowrap">
                      Category
                    </TableHead>
                    <TableHead className="whitespace-nowrap">Price</TableHead>
                    <TableHead className="whitespace-nowrap">Stock</TableHead>
                    <TableHead className="whitespace-nowrap">Status</TableHead>
                    <TableHead className="whitespace-nowrap">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentProduct.length > 0 ? (
                    currentProduct?.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium whitespace-nowrap">
                          {product.name}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {capitalizeWords(product.category)}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          ${product.price}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {product.stock}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold bg-green-100 ${
                              product.stock > 0
                                ? "text-green-800"
                                : "text-red-700"
                            }`}
                          >
                            {product.stock > 0 ? "In Stock" : "Out of Stock"}
                          </span>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleView(product)}
                              >
                                <Eye className="w-4 h-4 mr-2" /> View
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleEdit(product)}
                              >
                                <Edit className="w-4 h-4 mr-2" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => {
                                  setSelectedProductId(product.id);
                                  setShowDeleteDialog(true);
                                }}
                              >
                                <Trash2 className="w-4 h-4 mr-2" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        {searchTerm ||
                        statusFilters.length > 0 ||
                        paymentFilters.length > 0
                          ? "No products match your criteria"
                          : "No products found"}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="pt-1">
            <Separator />
            <div className="pt-5">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
