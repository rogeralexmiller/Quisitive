class User < ActiveRecord::Base

  validates :session_token, :full_name, presence: true
  validates :password, length: {minimum: 6}, allow_nil: true

  has_many(
    :questions,
    class_name: "Question",
    foreign_key: :author_id,
    primary_key: :id
  )

  has_many(
    :answers,
    class_name: "Answer",
    foreign_key: :author_id,
    primary_key: :id
  )

  attr_reader :password

  after_initialize :ensure_session_token

  def self.find_by_credentials(email, password)
    user = self.find_by_email(email)

    if user && user.is_password?(password)
      user
    else
      nil
    end
  end

  def self.find_or_create_from_auth_hash(auth_hash)
    user = User.find_by(twitter_uid: auth_hash[:uid])
    if user.nil?
      email = auth_hash[:info][:email] || ""
      user = User.create!(
        twitter_uid: auth_hash[:uid],
        full_name: auth_hash[:info][:name],
        email: email
      )
    end

    user
  end

  def ensure_session_token
    self.session_token ||= new_session_token
  end

  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
    @password = password
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = new_session_token
    ensure_session_token_uniqueness
    self.save
    self.session_token
  end

  def new_session_token
    SecureRandom.base64
  end

  def ensure_session_token_uniqueness
    while User.find_by(session_token: self.session_token)
      self.session_token = new_session_token
    end
  end

end
