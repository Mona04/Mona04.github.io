module Jekyll
  module Utils
    def titleize_slug(slug)
      slug.split("-").join(" ")
    end
  end
end