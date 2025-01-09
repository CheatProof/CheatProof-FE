import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import { HiOutlinePencil, HiOutlineTrash, HiOutlineEye } from "react-icons/hi";
import { getQuestionsCountByCategoryId, deleteChildCategory, updateChildCategory } from "../api/child-category"; // Add your update function here
import { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";

const CategoryTable = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState<string | null>(null);
  const [categoryIdToEdit, setCategoryIdToEdit] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    const category = await getQuestionsCountByCategoryId();
    setCategories(category.data);
    setLoading(false);
  };

  const handleDeleteClick = (categoryId: string) => {
    setCategoryIdToDelete(categoryId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (categoryIdToDelete) {
      await deleteChildCategory(categoryIdToDelete);
      setCategories(categories.filter((category) => category.id !== categoryIdToDelete));
      setShowDeleteModal(false);
    }
  };

  const handleEditClick = (categoryId: string, categoryName: string) => {
    setCategoryIdToEdit(categoryId);
    setNewCategoryName(categoryName);
    setShowEditModal(true);
  };

  const confirmEdit = async () => {
    if (categoryIdToEdit && newCategoryName.trim()) {
      await updateChildCategory(categoryIdToEdit, newCategoryName); // Call your update API
      setCategories(
        categories.map((category) =>
          category.id === categoryIdToEdit ? { ...category, categoryName: newCategoryName } : category
        )
      );
      setShowEditModal(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <table className="mt-6 w-full whitespace-nowrap text-left max-lg:block max-lg:overflow-x-scroll">
        <colgroup>
          <col className="w-full sm:w-4/12" />
          <col className="lg:w-4/12" />
          <col className="lg:w-2/12" />
          <col className="lg:w-1/12" />
        </colgroup>
        <thead className="border-b dark:border-white/10 border-black/10 text-sm leading-6 dark:text-whiteSecondary text-blackPrimary">
          <tr>
            <th scope="col" className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">Category</th>
            <th scope="col" className="py-2 pl-0 pr-8 font-semibold table-cell">Number of Questions</th>
            <th scope="col" className="py-2 pl-0 pr-8 font-semibold table-cell lg:pr-20">Parent category</th>
            <th scope="col" className="py-2 pl-0 pr-4 text-right font-semibold table-cell sm:pr-6 lg:pr-14">Actions</th>
          </tr>
        </thead>
        {/* <tbody className="divide-y divide-white/5">
        
          {categories.map((item: any) => (
            <tr key={nanoid()}>
              <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                <div className="flex items-center gap-x-4">
                  <div className="truncate text-sm font-medium leading-6 dark:text-whiteSecondary text-blackPrimary">
                    {item.categoryName}
                  </div>
                </div>
              </td>
              <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                <div className="flex items-center gap-x-2 justify-start">
                  <div className="dark:text-whiteSecondary text-blackPrimary block">{item.questionCount}</div>
                </div>
              </td>
              <td className="py-4 pl-0 pr-8 text-sm leading-6 dark:text-whiteSecondary text-blackPrimary table-cell lg:pr-20">
                {item.ParentCategories.parentCategoryName}
              </td>
              <td className="py-4 pl-0 pr-4 text-right text-sm leading-6 dark:text-whiteSecondary text-blackPrimary table-cell  lg:pr-8">
                <div className="flex gap-x-1 justify-end">
                  <button
                    onClick={() => handleEditClick(item.id, item.categoryName)}
                    className="dark:bg-blackPrimary dark:text-whiteSecondary text-blackPrimary w-8 h-8 flex justify-center items-center cursor-pointer dark:hover:border-gray-500 hover:border-gray-400"
                  >
                    <HiOutlinePencil className="text-lg hover:text-2xl" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(item.id)}
                    className="dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary w-8 h-8 flex justify-center items-center cursor-pointer dark:hover:border-gray-500 hover:border-gray-400"
                  >
                    <HiOutlineTrash className="text-lg hover:text-2xl" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        
        </tbody> */}

<tbody className="divide-y divide-white/5">
  {loading ? (
    <tr>
      <td colSpan={4} className="text-center py-4">
        
        <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "start",
                height: "80vh",
              }}
            >
              <Circles height="80" width="80" color="#152487" ariaLabel="loading" />
            </div>
      </td>
    </tr>
  ) : (
    categories.map((item: any) => (
      <tr key={nanoid()}>
        <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
          <div className="flex items-center gap-x-4">
            <div className="truncate text-sm font-medium leading-6 dark:text-whiteSecondary text-blackPrimary">
              {item.categoryName}
            </div>
          </div>
        </td>
        <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
          <div className="flex items-center gap-x-2 justify-start">
            <div className="dark:text-whiteSecondary text-blackPrimary block">
              {item.questionCount}
            </div>
          </div>
        </td>
        <td className="py-4 pl-0 pr-8 text-sm leading-6 dark:text-whiteSecondary text-blackPrimary table-cell lg:pr-20">
          {item.ParentCategories.parentCategoryName}
        </td>
        <td className="py-4 pl-0 pr-4 text-right text-sm leading-6 dark:text-whiteSecondary text-blackPrimary table-cell lg:pr-8">
          <div className="flex gap-x-1 justify-end">
            <button
              onClick={() => handleEditClick(item.id, item.categoryName)}
              className="dark:bg-blackPrimary dark:text-whiteSecondary text-blackPrimary w-8 h-8 flex justify-center items-center cursor-pointer dark:hover:border-gray-500 hover:border-gray-400"
            >
              <HiOutlinePencil className="text-lg hover:text-2xl" />
            </button>
            <button
              onClick={() => handleDeleteClick(item.id)}
              className="dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary w-8 h-8 flex justify-center items-center cursor-pointer dark:hover:border-gray-500 hover:border-gray-400"
            >
              <HiOutlineTrash className="text-lg hover:text-2xl" />
            </button>
          </div>
        </td>
      </tr>
    ))
  )}
</tbody>

      </table>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold">Confirm Deletion</h2>
            <p>Are you sure you want to delete this category?</p>
            <div className="mt-4 flex justify-end gap-4">
              <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 bg-gray-300 rounded">
                Cancel
              </button>
              <button onClick={confirmDelete} className="px-4 py-2 bg-red-500 text-white rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold">Edit Category</h2>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="mt-2 w-full px-4 py-2 border rounded"
            />
            <div className="mt-4 flex justify-end gap-4">
              <button onClick={() => setShowEditModal(false)} className="px-4 py-2 bg-gray-300 rounded">
                Cancel
              </button>
              <button onClick={confirmEdit} className="px-4 py-2 bg-blue-500 text-white rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryTable;
