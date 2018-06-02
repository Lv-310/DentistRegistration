using DentistRegistration.DataAccessLayer;
using DentistRegistration.Models;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace DentistRegistration.Controllers
{
    public class PriceController : ApiController
    {
        private PricesDAL priceDal = new PricesDAL();

        // GET: api/Price/5
        public IEnumerable<PriceModel> Get(int id)
        {
            return priceDal.GetById(id);
        }

        // POST: api/Price
        [HttpPost]
        [Route("api/Price/add")]
        public IHttpActionResult InsertPrice([FromBody]PriceModel price)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                bool isAdded = priceDal.Insert(price, out string message);
                if (isAdded)
                {
                    return Ok(message);
                }
                return BadRequest(message);
            }
            catch (Exception)
            {
                return BadRequest(ModelState);
            }
        }


        [HttpPost]
        [Route("api/Price/edit")]
        public IHttpActionResult EditPrice([FromBody]PriceModel price)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                string message;
                bool isAdded = priceDal.Update(price, out message);
                if (isAdded)
                {
                    return Ok(message);
                }
                return BadRequest(message);
            }
            catch (Exception e)
            {
                return BadRequest(ModelState);
            }
        }

        public IHttpActionResult Delete([FromBody]PriceModel price)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                bool isDeleted = priceDal.Delete(price);
                if (isDeleted)
                {
                    return Ok("Price is deleted");
                }
                return BadRequest("U cannot delete this price");
            }
            catch (Exception e)
            {
                return BadRequest(ModelState);
            }
        }
    }
}
