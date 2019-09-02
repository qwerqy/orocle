import React from 'react';
import { rhythm } from '../utils/typography';
import { Link } from 'gatsby';
import { RingLoader } from 'react-spinners';
import { TagsList, Tag } from './tags';
import { getPlatAmount } from '../utils/platinumHandler';
import Moment from 'react-moment';

const SearchResults = (props: any) => {
  const [isLoading, updateIsLoading] = React.useState(true);
  const [, updateState] = React.useState();

  React.useEffect(() => {
    props.results.map(async node => {
      node.plats = await getPlatAmount(node.id);
      updateIsLoading(false);
      updateState({});
    });
  }, [props.results]);

  return (
    <section aria-label="Search results for all posts">
      {props.results
        ? `Found ${props.results.length} articles on "${props.query}"`
        : 'No results found'}
      {props.results.map(node => {
        const title = node.title || node.slug;
        const { tags, url, description, date } = node;

        return (
          <div key={url}>
            <h3
              style={{
                marginBottom: rhythm(1 / 4),
              }}
            >
              <Link
                style={{ boxShadow: `none`, textDecoration: 'none' }}
                to={url}
              >
                {title}
              </Link>
            </h3>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <small>
                <Moment format="MMMM D, YYYY" withTitle>
                  {date}
                </Moment>
              </small>
              <i
                style={{
                  fontSize: '1rem',
                  marginLeft: '10px',
                  color: '#81A1C1',
                }}
                className={`fas fa-trophy icon-buffer`}
              />
              {isLoading ? (
                <RingLoader
                  sizeUnit={'px'}
                  size={15}
                  color={'#81A1C1'}
                  loading={true}
                />
              ) : (
                <span style={{ color: '#81A1C1' }}>{node.plats}</span>
              )}
            </div>
            <TagsList>
              {tags.map((tag: string, i: number) => {
                return (
                  <Tag key={i} _key={i} data={tags}>
                    {tag}
                  </Tag>
                );
              })}
            </TagsList>

            <p
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
          </div>
        );
      })}
    </section>
  );
};

export default SearchResults;
