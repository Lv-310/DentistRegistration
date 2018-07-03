using NUnit.Framework;
using Moq;
using DentistRegistration.Interfaces;
using DentistRegistration.Models;
using DentistRegistration.DataAccessLayer;

namespace DentistRegistration.Controllers.Tests
{
    [TestFixture()]
    public class CalendarEventControllerTests
    {
        [Test()]
        public void GetEventsByDoctorIdTest()
        {
            Mock<IRepositoryCRUcollection<CalendarEvent>> myMock = new Mock<IRepositoryCRUcollection<CalendarEvent>>();
            myMock.Expect(m => m.GetById(It.IsAny<int>())).Returns((int i) => new CalendarEvent() { Id = i });
        }
    }
}