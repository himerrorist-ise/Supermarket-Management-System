using Project_API.Models;
using Project_API.SQLProcedures;
using System.Collections.Generic;
using System.Web.Http;

namespace Project_API.Controllers
{
    public class CategoryController : ApiController
    {
        private CategoryProcedures categoryProcedure = new CategoryProcedures();

        [HttpGet]
        public List<CategoryTable> Get()
        {
            return categoryProcedure.GetAllCategories();
        }

        [HttpPost]
        public bool Post(CategoryTable category)
        {
            if (categoryProcedure.AddCategory(category))
            {
                return true;
            }
            return false;
        }

        [HttpPut]
        public bool Put(CategoryTable category)
        {
            if (categoryProcedure.UpdateCategory(category))
            {
                return true;
            }
            return false;
        }

        [HttpDelete]
        public bool Delete(int id)
        {
            if (categoryProcedure.DeleteCategory(id))
            {
                return true;
            }
            return false;
        }
    }
}