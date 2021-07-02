using System.Collections.Generic;
using System.Web.Http;
using Project_API.Models;
using Project_API.SQLProcedures;

namespace Project_API.Controllers
{
    public class ManagerController : ApiController
    {
        private ManagerProcedures managerProcedure = new ManagerProcedures();

        [HttpGet]
        public List<ManagerTable> Get()
        {
            return managerProcedure.DisplayAllManagers();
        }

        [HttpPost]
        public bool Post(ManagerTable manager)
        {
            if (managerProcedure.AddManger(manager))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        [HttpPut]
        public bool Put(ManagerTable manager)
        {
            if (managerProcedure.UpdateManager(manager))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        [HttpDelete]
        public bool Delete(int id)
        {
            if (managerProcedure.DeleteManger(id))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}