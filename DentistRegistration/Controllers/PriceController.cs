using DentistRegistration.DataAccessLayer;
using DentistRegistration.Models;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace DentistRegistration.Controllers
{
    public class PriceController : ApiController
    {
        private PriceDataAccessLayer priceDal = new PriceDataAccessLayer();

        // GET: api/Price/5
        public IEnumerable<PriceModel> Get(int id)
        {
            return priceDal.GetAllPricesById(id);
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
                bool isAdded = priceDal.InsertPrice(price, out string message);
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
                bool isAdded = priceDal.EditPrice(price, out message);
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

        // DELETE: api/Price/5
        public void Delete(int id)
        {
        }
    }
}
