import { useFormStore } from '../../store/useFormStore.ts';
import './SubmissionList.css';

const SubmissionList = () => {
  const submissions = useFormStore((state) => state.successfulSubmissions);

  return (
    submissions.length > 0 && (
      <section className="submission-list">
        <h2 className="submission-list__title">Submissions</h2>
        <ul className="submission-list__items">
          {submissions.map((s) => (
            <li key={s.id} className="submission-card">
              <div className="submission-card__row">
                <span className="submission-card__label">Name</span>
                <span className="submission-card__value">{s.name}</span>
              </div>
              <div className="submission-card__row">
                <span className="submission-card__label">Age</span>
                <span className="submission-card__value">{s.age}</span>
              </div>
              <div className="submission-card__row">
                <span className="submission-card__label">Email</span>
                <span className="submission-card__value">{s.email}</span>
              </div>
              <div className="submission-card__row">
                <span className="submission-card__label">Gender</span>
                <span className="submission-card__value">{s.gender}</span>
              </div>
              {s.country && (
                <div className="submission-card__row">
                  <span className="submission-card__label">Country</span>
                  <span className="submission-card__value">{s.country}</span>
                </div>
              )}
              {s.image && (
                <div className="submission-card__row submission-card__row--image">
                  <span className="submission-card__label">Photo</span>
                  <img
                    src={s.image}
                    alt={s.name}
                    className="submission-card__image"
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    )
  );
};

export default SubmissionList;
