using AutoMapper;
using BeerCatalog.Application.Models;
using BeerCatalog.Application.Models.Beer;
using BeerCatalog.Domain.Models.Beer;

namespace BeerCatalog.Application.MappingProfiles;

public class ReviewProfile : Profile
{
    public ReviewProfile()
    {
        CreateMap<CreateReviewDto, BeerReview>();
        CreateMap<BeerReview, ReviewReadDto>()
            .ForMember(b => b.AvatarUrl, opt =>
                opt.MapFrom(a => a.User.AvatarUrl))
            .ForMember(b => b.Username, opt =>
                opt.MapFrom(a => a.User.UserName));
        CreateMap<DeleteReviewDto, BeerReview>();
    }
}